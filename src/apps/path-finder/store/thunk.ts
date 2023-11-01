import { AppDispatch, RootState } from '@/host/store/store';
import { setCell, setClickType, setIsPlaying } from './path-finder.slice';

import { ClickType } from '../models/interfaces';
import { pathFinders } from '../algorithms/path-finder';
import { toast } from 'sonner';
import { tracePath } from '../helpers/path.helper';

export const searchPath =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().pathFinder;
    dispatch(setIsPlaying(true));
    dispatch(setClickType(ClickType.fill));

    const parents = await pathFinders.get(state.pathFinder)?.fn(
      state.grid,
      state.entry!,
      state.exit!,
      (value: { row: number; col: number }) => dispatch(setCell(value)),
      () => getState().pathFinder.isPlaying
    );

    if (!getState().pathFinder.isPlaying) {
      return;
    }

    if (parents) {
      toast.success('Path found!!! 😃');

      dispatch(setClickType(ClickType.path));
      const pathLength = await tracePath(
        parents,
        state.entry!,
        state.exit!,
        (value: { row: number; col: number }) => dispatch(setCell(value)),
        () => getState().pathFinder.isPlaying
      );

      toast('Path length is ' + (pathLength + 1));
    }

    dispatch(setClickType(ClickType.clear));
  };
