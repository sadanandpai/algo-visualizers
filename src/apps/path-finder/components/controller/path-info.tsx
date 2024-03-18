import { useAppSelector } from '@/host/store/hooks';
import useTimer from '@pathFinder/hooks/use-timer.hook';
import { useEffect } from 'react';
import { Status } from '@pathFinder/models/interfaces';
import classes from './controller.module.scss';

function PathInfo() {
  const status = useAppSelector((state) => state.pathFinder.status);
  const visitedCellCount = useAppSelector(
    (state) => state.pathFinder.visitedCellCount
  );

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
    }
  }, [status, startTimer, stopTimer, isRunning, resetTimer]);

  return (
    <div className={classes.pathInfo}>
      <p>
        Visited Cell:{' '}
        <span className={classes.highlight}>{visitedCellCount}</span>
      </p>

      <p>
        Time: <span className={classes.highlight}>{time}</span>
      </p>
    </div>
  );
}

export default PathInfo;
