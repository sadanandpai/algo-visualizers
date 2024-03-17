import { resetGrid, setDimension } from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useDebounce, useWindowSize } from 'react-use';

import Execution from './execution';
import Operations from './operations';
import classes from './controller.module.scss';
import { getDimensionsFromScreenSize } from '../../helpers/grid';
import Info from './info';
import Timer from './timer';
import { defaultSpeeds } from '../../config';

function Controller() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.pathFinder.rows);
  const cols = useAppSelector((state) => state.pathFinder.cols);
  const { width, height } = useWindowSize();
  const defaultSpeed =
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
      <Operations defaultSpeed={defaultSpeed} />
      <Info />
      <Timer />
      <Execution defaultSpeed={defaultSpeed} />
    </section>
  );
}

export default Controller;
