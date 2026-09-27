import { AppDispatch, RootState } from '@/host/store/store';
import { delay } from '@/lib/helpers/async';
import { pathFinders } from '@pathFinder/algorithms';
import { tracePath } from '@pathFinder/algorithms/path-finder/path-tracer';
import {
  Cell,
  CellType,
  RaceLane,
  SearchAlgoProps,
  Status,
} from '@pathFinder/models';
import {
  finishRace,
  setCells as setStateCells,
  setRace,
  startRace,
  setVisitedCellCount,
} from '@pathFinder/store/path-finder.slice';

export function searchPath(
  pathFinderAlgo: (
    props: SearchAlgoProps,
  ) => Promise<{ grid: CellType[][]; parents: Cell[][] | null }>,
  delayDuration: number,
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let visitedCellCount = 0;

    function isSearching() {
      return getState().pathFinder.status === Status.Searching;
    }

    async function updateCells(
      grid: CellType[][],
      cells: Cell | Cell[],
      cellType = CellType.clear,
    ) {
      if (!isSearching()) {
        throw new Error('Path search cancelled');
      }

      if (!Array.isArray(cells)) {
        cells = [cells];
      }
      cells.forEach((cell) => {
        grid[cell.row][cell.col] = cellType;
      });

      visitedCellCount += cells.length;
      if (delayDuration) {
        dispatch(setVisitedCellCount(visitedCellCount));
        dispatch(setStateCells({ cells, cellType }));
        await delay(delayDuration);
      }
    }

    const state = getState().pathFinder;
    const { grid, parents } = await pathFinderAlgo({
      grid: state.grid,
      entry: state.entry,
      exit: state.exit,
      updateCells,
    });
    dispatch(setVisitedCellCount(visitedCellCount));
    return { grid, parents };
  };
}

const racePollInterval = 10;
let lastRaceId = 0;

interface PendingStep {
  lane: RaceLane;
  searching: boolean;
  apply: () => void;
  resolve: () => void;
  reject: (error: Error) => void;
}

interface RaceOptions {
  stopAtFirst?: boolean;
}

class LaneStoppedError extends Error {}

// Runs several path finders on the same maze in lockstep. A step is one call
// of a lane's cell update callback, whether it marks visited cells or a path
// cell. Every tick applies exactly one step of each lane that has not
// finished yet, so a lane is never more than one step ahead of another.
export function raceSearch(
  algorithms: string[],
  delayDuration: number,
  { stopAtFirst = false }: RaceOptions = {},
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { grid: maze, entry, exit } = getState().pathFinder;

    const lanes: RaceLane[] = algorithms.map((algorithm) => ({
      algorithm,
      grid: maze.map((row) => row.slice()),
      steps: 0,
      visitedCellCount: 0,
      pathLength: 0,
      finishTick: null,
      rank: null,
    }));

    lastRaceId += 1;
    const id = lastRaceId;
    let tick = 0;
    let stepsUsed = 0;
    // lanes still taking part: a lane leaves when it finishes or is stopped
    const active = new Set(lanes);
    const searching = new Set(lanes);
    let detachScheduled = false;
    let inFlight: PendingStep[] = [];
    let laneFailed = false;
    let allLanesDone = () => {};
    const lanesDone = new Promise<void>((resolve) => {
      allLanesDone = resolve;
    });
    let arrived: PendingStep[] = [];
    let pathFound = false;

    function currentRace() {
      const race = getState().pathFinder.race;
      return race?.id === id ? race : null;
    }

    function snapshot() {
      const race = currentRace();
      return {
        id,
        tick,
        paused: race?.paused ?? false,
        stepRequests: race?.stepRequests ?? 0,
        lanes: lanes.map((lane) => ({
          ...lane,
          grid: lane.grid.map((row) => row.slice()),
        })),
      };
    }

    function publish() {
      dispatch(setRace(snapshot()));
    }

    function isCancelled() {
      return (
        getState().pathFinder.status !== Status.Searching || !currentRace()
      );
    }

    // Holds the next tick while the race is paused, letting one tick through
    // for every step requested during the pause.
    async function waitWhilePaused() {
      for (;;) {
        const race = currentRace();
        if (isCancelled() || !race) {
          return;
        }

        if (!race.paused) {
          stepsUsed = race.stepRequests;
          return;
        }

        if (race.stepRequests > stepsUsed) {
          stepsUsed += 1;
          return;
        }

        await delay(racePollInterval);
      }
    }

    function cancelError() {
      return new Error('Path search cancelled');
    }

    function stopLane(lane: RaceLane) {
      active.delete(lane);
      searching.delete(lane);
      if (active.size === 0) {
        allLanesDone();
      }
    }

    // A lane whose search is busy between two calls would hold the tick back
    // for good once a path is found. Let every promise callback already queued
    // run first, so that a lane whose search ended on the same tick is seen as
    // ended, then stop the lanes whose search is still going.
    function scheduleDetach() {
      if (!stopAtFirst || !pathFound || detachScheduled) {
        return;
      }

      detachScheduled = true;
      setTimeout(() => {
        detachScheduled = false;
        if (ended) {
          return;
        }

        const waiting = new Set(
          [...arrived, ...inFlight].map((step) => step.lane),
        );
        [...searching]
          .filter((lane) => active.has(lane) && !waiting.has(lane))
          .forEach(stopLane);
        advance();
      });
    }

    async function advance() {
      if (arrived.length === 0 || arrived.length < active.size) {
        scheduleDetach();
        return;
      }

      let batch = arrived;
      arrived = [];

      // once a lane's search has found a path, the lanes still searching stop
      // where they are instead of making their next step
      if (stopAtFirst && pathFound) {
        batch
          .filter((step) => step.searching)
          .forEach((step) => {
            stopLane(step.lane);
            step.reject(new LaneStoppedError());
          });
        batch = batch.filter((step) => !step.searching);
        if (batch.length === 0) {
          advance();
          return;
        }
      }

      inFlight = batch;
      await waitWhilePaused();

      if (!isCancelled()) {
        batch.forEach((step) => step.apply());
        tick += 1;
        publish();

        if (delayDuration) {
          await delay(delayDuration);
        }
      }

      inFlight = [];
      if (isCancelled()) {
        batch.forEach((step) => step.reject(cancelError()));
      } else {
        batch.forEach((step) => step.resolve());
      }
    }

    function takeStep(lane: RaceLane, apply: () => void) {
      if (isCancelled()) {
        return Promise.reject(cancelError());
      }

      if (!active.has(lane)) {
        return Promise.reject(new LaneStoppedError());
      }

      return new Promise<void>((resolve, reject) => {
        arrived.push({
          lane,
          searching: searching.has(lane),
          apply,
          resolve,
          reject,
        });
        advance();
      });
    }

    function finishLane(lane: RaceLane) {
      if (active.delete(lane)) {
        if (active.size === 0) {
          allLanesDone();
        }
        advance();
      }
    }

    // Lanes waiting for a tick are only released by the other lanes, so a
    // lane stalled between two steps would keep them waiting after a cancel.
    // Watch for the cancel instead, release the waiting lanes, and stop
    // waiting for the lanes that are still busy.
    let ended = false;
    async function watchForCancel() {
      while (!ended) {
        if (isCancelled()) {
          const waiting = arrived;
          arrived = [];
          waiting.forEach((step) => step.reject(cancelError()));
          return;
        }

        await delay(racePollInterval);
      }
    }

    async function runLane(lane: RaceLane) {
      const algo = pathFinders.get(lane.algorithm);

      try {
        if (!algo) {
          return;
        }

        const { grid, parents } = await algo.fn({
          grid: maze,
          entry,
          exit,
          updateCells: (grid, cells, cellType = CellType.clear) => {
            const list = Array.isArray(cells) ? cells : [cells];
            list.forEach((cell) => {
              grid[cell.row][cell.col] = cellType;
            });

            return takeStep(lane, () => {
              list.forEach((cell) => {
                lane.grid[cell.row][cell.col] = cellType;
              });
              lane.steps += 1;
              lane.visitedCellCount += list.length;
            });
          },
        });
        if (!active.has(lane)) {
          return;
        }

        searching.delete(lane);
        lane.finishTick = lane.steps;

        if (parents) {
          pathFound = true;
          const tracedLength = await tracePath({
            parents,
            entry,
            exit,
            updateCell: (cell) => {
              grid[cell.row][cell.col] = CellType.path;

              return takeStep(lane, () => {
                lane.grid[cell.row][cell.col] = CellType.path;
                lane.steps += 1;
                lane.pathLength += 1;
              });
            },
          });
          lane.pathLength = tracedLength + 1;
        }

        lane.grid = grid.map((row) => row.slice());
      } catch (error) {
        if (!(error instanceof LaneStoppedError)) {
          laneFailed = true;
        }
      } finally {
        finishLane(lane);
      }
    }

    // the status and the starting race are stored in one update, so a store
    // listener that cancels on either sees both and its cancel is final
    dispatch(startRace(snapshot()));
    if (isCancelled()) {
      return;
    }

    // a stopped lane may still be busy in its path finder, so the race ends
    // once no lane is taking part rather than once every path finder returns
    lanes.forEach(runLane);
    await Promise.race([lanesDone, watchForCancel()]);
    ended = true;
    if (laneFailed || isCancelled()) {
      return;
    }

    lanes.forEach((lane) => {
      if (lane.pathLength === 0 || lane.finishTick === null) {
        return;
      }

      const finishTick = lane.finishTick;
      lane.rank =
        1 +
        lanes.filter(
          (other) =>
            other.pathLength > 0 &&
            other.finishTick !== null &&
            other.finishTick < finishTick,
        ).length;
    });

    dispatch(finishRace(snapshot()));
  };
}
