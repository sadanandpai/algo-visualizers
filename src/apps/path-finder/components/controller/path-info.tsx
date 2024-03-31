import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import useTimer from '@pathFinder/hooks/use-timer.hook';
import { useEffect } from 'react';
import { Status } from '@pathFinder/models';
import classes from './controller.module.scss';
import {
  setPathLength,
  setVisitedCellCount,
} from '@pathFinder/store/path-finder.slice';

function PathInfo() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.pathFinder.status);
  const visitedCellCount = useAppSelector(
    (state) => state.pathFinder.visitedCellCount
  );
  const pathLength = useAppSelector((state) => state.pathFinder.pathLength);

  const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  useEffect(() => {
    if (status === Status.Searching && !isRunning) {
      resetTimer();
      startTimer();
    }

    if (Status.Complete === status) {
      stopTimer();
    }

    if ([Status.Ready, Status.Generating].includes(status)) {
      resetTimer();
      dispatch(setVisitedCellCount(0));
      dispatch(setPathLength(0));
    }
  }, [status, startTimer, stopTimer, isRunning, resetTimer, dispatch]);

  return (
    <div className={classes.pathInfo + ' path-info'}>
      <p>
        Visits:{' '}
        <span className={classes.highlight} data-testid="visits">
          {visitedCellCount}
        </span>
      </p>
      <p>
        Path:{' '}
        <span className={classes.highlight} data-testid="path">
          {pathLength}
        </span>
      </p>
      <p>
        Time:{' '}
        <span className={classes.highlight} data-testid="time">
          {time}
        </span>
      </p>
    </div>
  );
}

export default PathInfo;
