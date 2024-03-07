import { AppDispatch, RootState } from '@/host/store/store';
import {
  setCells as setStateCells,
  setCell as setStateCell,
  setStatus,
} from './path-finder.slice';

import { AlgoProps, Cell, CellType, Status } from '../models/interfaces';
import { toast } from 'sonner';
import { tracePath } from '../helpers/path.helper';

export const searchPath =
  (
    pathFinderAlgo: (props: AlgoProps) => Promise<Cell[][] | null>,
    delayDuration: number
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().pathFinder;
    dispatch(setStatus(Status.Running));

    const parents = await pathFinderAlgo({
      grid: state.grid,
      entry: state.entry,
      exit: state.exit,
      setCell: (value: Cell, cellType: CellType) =>
        dispatch(setStateCell({ ...value, cellType })),
      setCells: (cells: Cell[], cellType: CellType) => {
        dispatch(setStateCells({ cells, cellType }));
      },
      isRunning: () => getState().pathFinder.status === Status.Running,
      delayDuration,
    });

    if (getState().pathFinder.status !== Status.Running) {
      return;
    }

    if (parents) {
      toast.success('Path found!!! 😃');

      const pathLength = await tracePath(
        parents,
        state.entry!,
        state.exit!,
        (value: { row: number; col: number }) =>
          dispatch(setStateCell({ ...value, cellType: CellType.path })),
        () => getState().pathFinder.status === Status.Running,
        delayDuration * 2
      );

      toast('Path length is ' + (pathLength + 1));
    } else {
      toast.error('No path found 😔');
    }

    dispatch(setStatus(Status.Complete));
  };
