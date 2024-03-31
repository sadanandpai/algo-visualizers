import { AppDispatch, RootState } from '@/host/store/store';
import { delay } from '@/lib/helpers/async';
import { Cell, CellType, SearchAlgoProps, Status } from '@pathFinder/models';
import {
  setCells as setStateCells,
  setVisitedCellCount,
} from '@pathFinder/store/path-finder.slice';

export function searchPath(
  pathFinderAlgo: (
    props: SearchAlgoProps
  ) => Promise<{ grid: CellType[][]; parents: Cell[][] | null }>,
  delayDuration: number
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
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
