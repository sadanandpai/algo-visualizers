import { useDebounce, useWindowSize } from 'react-use';
import { resetGrid, setDimension } from '@pathFinder/store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import Execution from '@pathFinder/components/controller/execution';
import Operations from '@pathFinder/components/controller/operations';
import { getDimensionsFromScreenSize } from '@/apps/path-finder/helpers/grid.helper';
import PathInfo from '@/apps/path-finder/components/controller/path-info';
import { defaultSpeeds } from '@pathFinder/config';
import classes from './controller.module.scss';

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
      <PathInfo />
      <Execution defaultSpeed={defaultSpeed} />
    </section>
  );
}

export default Controller;
