import { AppDispatch, RootState } from '@/host/store/store';
import {
  setCells as setStateCells,
  setCell as setStateCell,
  setGrid,
  setStatus,
} from './path-finder.slice';

import { SearchAlgoProps, Cell, CellType, Status } from '../models/interfaces';
import { toast } from 'sonner';
import { tracePath } from '../helpers/path.helper';
import { delay } from '@/lib/helpers/async';

export function searchPath(
  pathFinderAlgo: (
    props: SearchAlgoProps
  ) => Promise<{ grid: CellType[][]; parents: Cell[][] | null }>,
  delayDuration: number
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().pathFinder;
    dispatch(setStatus(Status.Searching));

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
      });

      if (delayDuration) {
        dispatch(setStateCells({ cells, cellType }));
        await delay(delayDuration);
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
