import { useRef, useState } from 'react';

function useTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  function startTimer() {
    setIsRunning(true);
    timer.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 100);
  }

  function stopTimer() {
    setIsRunning(false);
    if (timer.current) {
      clearInterval(timer.current);
    }
  }

  function resetTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    setTime(0);
    setIsRunning(false);
  }

  return { time, isRunning, startTimer, stopTimer, resetTimer };
}

export default useTimer;
