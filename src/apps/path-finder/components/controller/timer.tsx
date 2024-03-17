import { useAppSelector } from '@/host/store/hooks';
import useTimer from '../../hooks/use-timer.hook';
import { useEffect } from 'react';
import { Status } from '../../models/interfaces';
import classes from './controller.module.scss';

function Timer() {
  const status = useAppSelector((state) => state.pathFinder.status);
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
    <p>
      Time: <span className={classes.time}>{time}</span>
    </p>
  );
}

export default Timer;
