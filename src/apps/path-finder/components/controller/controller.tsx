import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import MazeControls from '@pathFinder/components/controller/maze-controls';
import PathControls from '@pathFinder/components/controller/path-controls';
import PathInfo from '@pathFinder/components/controller/path-info';
import { defaultSpeeds } from '@pathFinder/config';
import { getDimensionsFromScreenSize } from '@pathFinder/helpers/grid.helper';
import { Speed } from '@pathFinder/models';
import { resetGrid, setDimension } from '@pathFinder/store/path-finder.slice';
import { useDebounce, useWindowSize } from 'react-use';

import classes from './controller.module.scss';

function Controller() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.pathFinder.rows);
  const cols = useAppSelector((state) => state.pathFinder.cols);
  const { width, height } = useWindowSize();
  const defaultSpeed: Speed =
    width < 768 ? defaultSpeeds.mobile : defaultSpeeds.desktop;

  useDebounce(
    () => {
      const maxDimension = getDimensionsFromScreenSize();
      if (maxDimension.maxRows === rows && maxDimension.maxCols === cols) {
        return;
      }

      dispatch(
        setDimension({ rows: maxDimension.maxRows, cols: maxDimension.maxCols })
      );
      dispatch(resetGrid());
    },
    333,
    [width, height]
  );

  return (
    <section className={classes.controller}>
      <MazeControls defaultSpeed={defaultSpeed} />
      <PathInfo />
      <PathControls defaultSpeed={defaultSpeed} />
    </section>
  );
}

export default Controller;
