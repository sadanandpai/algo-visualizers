import { AppDispatch, RootState } from '@/host/store/store';
import { setCell, setIsPlaying } from './path-finder.slice';

import { CellType } from '../models/interfaces';
import { pathFinders } from '../algorithms/path-finder';
import { toast } from 'sonner';
import { tracePath } from '../helpers/path.helper';

export const searchPath =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().pathFinder;
    dispatch(setIsPlaying(true));

    const parents = await pathFinders.get(state.pathFinder)?.fn(
      state.grid,
      state.entry,
      state.exit,
      (value: { row: number; col: number }) =>
        dispatch(setCell({ ...value, cellType: CellType.fill })),
      () => getState().pathFinder.isPlaying
    );

    if (!getState().pathFinder.isPlaying) {
      return;
    }

    if (parents) {
      toast.success('Path found!!! 😃');

      const pathLength = await tracePath(
        parents,
        state.entry!,
        state.exit!,
        (value: { row: number; col: number }) =>
          dispatch(setCell({ ...value, cellType: CellType.path })),
        () => getState().pathFinder.isPlaying
      );

      toast('Path length is ' + (pathLength + 1));
    }
  };
