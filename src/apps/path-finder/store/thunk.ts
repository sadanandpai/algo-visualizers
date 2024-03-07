import { AppDispatch, RootState } from '@/store/store';
import { setClickType, setIsPlaying, updateGrid } from './path-finder.slice';
import { startBFSAlgo, tracePath } from '../algorithms/bfs';

import { ClickType } from '../models/interfaces';
import { toast } from 'sonner';

export const searchPath =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().pathFinder;
    dispatch(setIsPlaying(true));
    dispatch(setClickType(ClickType.fill));

    const parents = await startBFSAlgo(
      state.grid,
      state.entry!,
      state.exit!,
      (value: { row: number; col: number }) => dispatch(updateGrid(value)),
      () => getState().pathFinder.isPlaying
    );

    if (parents) {
      toast.success('Path found!!! 😃');

      dispatch(setClickType(ClickType.path));
      const pathLength = await tracePath(
        parents,
        state.entry!,
        state.exit!,
        (value: { row: number; col: number }) => dispatch(updateGrid(value)),
        () => getState().pathFinder.isPlaying
      );

      toast('Shortest path length is ' + (pathLength + 1));
    }

    dispatch(setClickType(ClickType.clear));
  };
