import { AppDispatch, RootState } from '@/host/store/store';
import {
  setCell as setStateCell,
  setPathLength,
} from '@pathFinder/store/path-finder.slice';

import { Cell, CellType, Status } from '@pathFinder/models';
import { toast } from 'sonner';
import { tracePath } from '@pathFinder/algorithms/path-finder/path-tracer';
import { delay } from '@/lib/helpers/async';

export function highlightPath(
  grid: CellType[][],
  parents: Cell[][] | null,
  delayDuration: number
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let pathLength = 0;

    function isSearching() {
      return getState().pathFinder.status === Status.Searching;
    }

    async function updateCell(cell: Cell, cellType = CellType.path) {
      if (!isSearching()) {
        throw new Error('Path search cancelled');
      }

      grid[cell.row][cell.col] = cellType;

      pathLength += 1;
      if (delayDuration) {
        dispatch(setPathLength(pathLength));
        dispatch(setStateCell({ ...cell, cellType }));
        await delay(delayDuration);
      }
    }

    const state = getState().pathFinder;
    if (parents) {
      toast.success('Path found!!! 😃');
      const pathLength = await tracePath({
        parents,
        entry: state.entry,
        exit: state.exit,
        updateCell,
      });

      dispatch(setPathLength(pathLength + 1));
    } else {
      toast.error('No path found 😔');
    }
  };
}
