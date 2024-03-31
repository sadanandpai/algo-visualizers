import { AppDispatch, RootState } from '@/host/store/store';
import {
  setCells as setStateCells,
  setGrid,
  setStatus,
  setVisitedCellCount,
} from '@pathFinder/store/path-finder.slice';
import { Cell, CellType, MazeAlgoProps, Status } from '@pathFinder/models';
import { delay } from '@/lib/helpers/async';

export function generateMaze(
  mazeAlgo: (props: MazeAlgoProps) => Promise<CellType[][]>,
  delayDuration: number
) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const state = getState().pathFinder;
    dispatch(setVisitedCellCount(0));

    dispatch(setStatus(Status.Generating));

    function updateGrid(grid: CellType[][]) {
      if (delayDuration) {
        dispatch(setGrid({ grid, clone: true }));
      }
    }

    function isGenerating() {
      return getState().pathFinder.status === Status.Generating;
    }

    async function updateCells(
      grid: CellType[][],
      cells: Cell | Cell[],
      cellType = CellType.clear
    ) {
      if (!isGenerating()) {
        throw new Error('Maze generation cancelled');
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
      const grid = await mazeAlgo({
        rows: state.rows,
        cols: state.cols,
        entry: state.entry,
        exit: state.exit,
        updateGrid,
        updateCells,
      });

      dispatch(setGrid({ grid }));
      dispatch(setStatus(Status.Ready));
    } catch {
      // maze generation cancelled
      // no action needed
    }
  };
}
