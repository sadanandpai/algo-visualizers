import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useDebounce } from 'react-use';
import {
  clearGrid,
  pauseRace,
  resumeRace,
  setGrid,
  setPathLength,
  setRace,
  stepRace,
  setStatus,
  setVisitedCellCount,
} from '@pathFinder/store/path-finder.slice';
import { Columns2, Pause, Play, RefreshCcw, StepForward } from 'lucide-react';
import { useState } from 'react';
import classes from './controller.module.scss';

import { pathFinders } from '@pathFinder/algorithms';
import { pathSearchAlgoInfo } from '@pathFinder/components/modal-icon/modal-content';
import { speeds } from '@pathFinder/config';
import { Speed, Status } from '@pathFinder/models';
import { highlightPath } from '@pathFinder/store/path.thunk';
import { raceSearch, searchPath } from '@pathFinder/store/search.thunk';
import Modals from '@pathFinder/components/modal-icon/modals';

interface Props {
  defaultSpeed: Speed;
}

const maxRaceLanes = 4;

function PathControls({ defaultSpeed }: Props) {
  const dispatch = useAppDispatch();
  const [pathFinder, setPathFinder] = useState('');
  const [speed, setSpeed] = useState(speeds.get(defaultSpeed) as number);
  const [compare, setCompare] = useState(false);
  const [racers, setRacers] = useState<string[]>([]);
  const [stopAtFirst, setStopAtFirst] = useState(false);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const status = useAppSelector((state) => state.pathFinder.status);
  const racePaused = useAppSelector(
    (state) => state.pathFinder.race?.paused ?? false,
  );
  const isRacing = useAppSelector(
    (state) =>
      state.pathFinder.race !== null &&
      state.pathFinder.status === Status.Searching,
  );
  const pathFinderAlgo = pathFinder ? pathFinders.get(pathFinder) : null;
  const disabled = status === Status.Generating || status === Status.Searching;

  async function executeSearch(algo: typeof pathFinderAlgo, speed: number) {
    if (status === Status.Complete) {
      dispatch(clearGrid());
    }

    if (!algo) {
      return;
    }

    try {
      dispatch(setRace(null));
      dispatch(setVisitedCellCount(0));
      dispatch(setPathLength(0));
      dispatch(setStatus(Status.Searching));
      const { grid, parents } = await dispatch(searchPath(algo.fn, speed));
      await dispatch(highlightPath(grid, parents, speed));
      dispatch(setGrid({ grid, clone: false }));
      dispatch(setStatus(Status.Complete));
    } catch {
      // search cancelled
      // no action needed
    }
  }

  async function executeRace() {
    if (status === Status.Complete) {
      dispatch(clearGrid());
    }

    const algorithms = [...pathFinders.keys()].filter((key) =>
      racers.includes(key),
    );
    await dispatch(raceSearch(algorithms, speed, { stopAtFirst }));
  }

  async function handlePlay(algo = pathFinderAlgo) {
    if (compare) {
      await executeRace();
      return;
    }

    await executeSearch(algo, speed);
  }

  function handleCompareToggle() {
    dispatch(clearGrid());
    dispatch(setVisitedCellCount(0));
    dispatch(setPathLength(0));
    setCompare(!compare);
  }

  function handleRacerToggle(key: string) {
    setRacers(
      racers.includes(key)
        ? racers.filter((racer) => racer !== key)
        : [...racers, key],
    );
  }

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const algo = e.target.value;
    setPathFinder(algo);
    await executeSearch(pathFinders.get(algo), speed);
  }

  function handleClear() {
    dispatch(clearGrid());
    dispatch(setVisitedCellCount(0));
    dispatch(setPathLength(0));
  }

  useDebounce(
    async () => {
      if (status === Status.Complete && !compare) {
        await executeSearch(pathFinderAlgo, 0);
      }
    },
    333,
    [entry, exit],
  );

  return (
    <div
      className={`${classes.execution} ${compare ? classes.compare : ''} execution`}
    >
      <Modals content={pathSearchAlgoInfo} />
      <button
        data-testid="compare"
        aria-pressed={compare}
        onClick={handleCompareToggle}
        disabled={status === Status.Generating}
        data-tooltip="Compare"
      >
        <Columns2 size={20} />
      </button>

      {compare ? (
        <fieldset className={classes.racers} disabled={disabled}>
          {[...pathFinders.entries()].map(([key, { name }]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={racers.includes(key)}
                disabled={
                  !racers.includes(key) && racers.length >= maxRaceLanes
                }
                onChange={() => handleRacerToggle(key)}
              />
              {name}
            </label>
          ))}
          <label className={classes.stopAtFirst}>
            <input
              type="checkbox"
              data-testid="race-stop-first"
              checked={stopAtFirst}
              onChange={() => setStopAtFirst(!stopAtFirst)}
            />
            Stop at first finish
          </label>
        </fieldset>
      ) : (
        <select
          className={classes.pathFinder}
          name="path-finder"
          id="path-finder"
          value={pathFinder}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="" disabled>
            Select a Path finder
          </option>
          {[...pathFinders.entries()].map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      )}

      <select
        className={`${classes.speed}`}
        name="path-finder-speed"
        id="path-finder-speed"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        disabled={disabled}
      >
        {[...speeds.entries()].map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>

      <button
        className={`${classes.play}`}
        data-testid="player"
        disabled={disabled || (compare ? racers.length < 2 : !pathFinder)}
        data-tooltip="Play"
        onClick={() => handlePlay()}
      >
        <Play size={20} />
      </button>

      {isRacing && (
        <>
          <button
            data-testid="race-pause"
            aria-pressed={racePaused}
            onClick={() => dispatch(racePaused ? resumeRace() : pauseRace())}
            data-tooltip={racePaused ? 'Resume' : 'Pause'}
          >
            {racePaused ? <Play size={20} /> : <Pause size={20} />}
          </button>

          <button
            data-testid="race-step"
            onClick={() => dispatch(stepRace())}
            disabled={!racePaused}
            data-tooltip="Step"
          >
            <StepForward size={20} />
          </button>
        </>
      )}

      <button
        data-testid="clear"
        onClick={handleClear}
        disabled={status === Status.Generating}
        data-tooltip="clear"
      >
        <RefreshCcw size={20} />
      </button>
    </div>
  );
}

export default PathControls;
