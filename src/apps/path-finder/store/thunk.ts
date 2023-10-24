import { AppDispatch, RootState } from '@/host/store/store';
import { setCell, setClickType, setIsPlaying } from './path-finder.slice';
import { startBFSAlgo, tracePath } from '../algorithms/path-finder/bfs';

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
      (value: { row: number; col: number }) => dispatch(setCell(value)),
      () => getState().pathFinder.isPlaying
    );

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

      toast('Shortest path length is ' + (pathLength + 1));
    }

    dispatch(setClickType(ClickType.clear));
  };
