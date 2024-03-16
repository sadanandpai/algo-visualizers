import { useAppSelector } from '@/host/store/hooks';
import useTimer from '../../hooks/use-timer.hook';
import { useEffect } from 'react';
import { Status } from '../../models/interfaces';

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
    <span>
      Time: <strong>{time}</strong>
    </span>
  );
}

export default Timer;
