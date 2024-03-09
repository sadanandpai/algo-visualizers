import { AppDispatch, RootState } from '@/host/store/store';
import { setCells as setStateCells, setGrid } from './path-finder.slice';
import { Cell, CellType, MazeAlgoProps } from '../models/interfaces';

export function generateMaze(
  mazeAlgo: (props: MazeAlgoProps) => Promise<void>,
  delayDuration: number
) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const state = getState().pathFinder;

    await mazeAlgo({
      rows: state.rows,
      cols: state.cols,
      entry: state.entry,
      exit: state.exit,
      setStateCells: (cells: Cell[], cellType: CellType) =>
        dispatch(setStateCells({ cells, cellType })),
      setStateGrid: ({
        grid,
        clone,
      }: {
        grid: CellType[][];
        clone?: boolean;
      }) => {
        dispatch(setGrid({ grid, clone }));
      },
      delayDuration,
    });
  };
}
