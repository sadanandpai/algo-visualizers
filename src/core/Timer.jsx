import React, { useEffect, useState } from "react";

export function Timer({ progressStatus, isAlgoExecutionOver }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliSeconds, setMilliSeconds] = useState(0);

  function resetTimer() {
    setMilliSeconds(0);
    setSeconds(0);
    setMinutes(0);
  }

  useEffect(() => {
    if (isAlgoExecutionOver) return;
    if (progressStatus === "start")
      var intervalId = setInterval(() => setMilliSeconds((ml) => ml + 1), 100);
    else if (progressStatus === "reset") resetTimer();
    return () => clearInterval(intervalId);
  }, [progressStatus, isAlgoExecutionOver]);

  useEffect(() => {
    if (milliSeconds === 10) {
      setSeconds((seconds) => seconds + 1);
      setMilliSeconds(0);
    }
  }, [milliSeconds]);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    }
  }, [seconds]);

  return `${minutes.toString().padStart(2, 0)}:${seconds
    .toString()
    .padStart(2, 0)}:${milliSeconds} s`;
}
