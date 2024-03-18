import { AppDispatch, RootState } from '@/host/store/store';
import {
  setCells as setStateCells,
  setCell as setStateCell,
  setGrid,
  setStatus,
  setVisitedCellCount,
} from '@pathFinder/store/path-finder.slice';

import {
  SearchAlgoProps,
  Cell,
  CellType,
  Status,
} from '@pathFinder/models/interfaces';
import { toast } from 'sonner';
import { tracePath } from '@pathFinder/helpers/path.helper';
import { delay } from '@/lib/helpers/async';

export function searchPath(
  pathFinderAlgo: (
    props: SearchAlgoProps
  ) => Promise<{ grid: CellType[][]; parents: Cell[][] | null }>,
  delayDuration: number
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().pathFinder;
    dispatch(setVisitedCellCount(0));
    dispatch(setStatus(Status.Searching));

    let visitedCellCount = 0;

    function isSearching() {
      return getState().pathFinder.status === Status.Searching;
    }

    async function updateCells(
      grid: CellType[][],
      cells: Cell | Cell[],
      cellType = CellType.clear
    ) {
      if (!isSearching()) {
        throw new Error('Path search cancelled');
      }

      if (!Array.isArray(cells)) {
        cells = [cells];
      }

      cells.forEach((cell) => {
        grid[cell.row][cell.col] = cellType;
        visitedCellCount++;
      });

      if (delayDuration) {
        dispatch(setStateCells({ cells, cellType }));
        await delay(delayDuration);
        dispatch(setVisitedCellCount(visitedCellCount));
      }
    }

    try {
      const { grid, parents } = await pathFinderAlgo({
        grid: state.grid,
        entry: state.entry,
        exit: state.exit,
        updateCells,
      });

      dispatch(setGrid({ grid }));

      if (parents) {
        toast.success('Path found!!! 😃');

        const pathLength = await tracePath(
          parents,
          state.entry!,
          state.exit!,
          (value: { row: number; col: number }) =>
            dispatch(setStateCell({ ...value, cellType: CellType.path })),
          () => getState().pathFinder.status === Status.Searching,
          delayDuration * 2
        );

        toast('Path length is ' + (pathLength + 1));
      } else {
        toast.error('No path found 😔');
      }

      dispatch(setStatus(Status.Complete));
    } catch {
      // Do nothing
    }
  };
}
