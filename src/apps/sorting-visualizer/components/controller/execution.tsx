import {
  setIsPlaying,
  setReset,
  setSpeed,
  startTimer,
} from '@/apps/sorting-visualizer/store/sorting-visualizer.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import classes from './controls.module.scss';
import pauseIcon from '/icons/pause.svg';
import playIcon from '/icons/play.svg';
import resetIcon from '/icons/reset.svg';
import { useEffect } from 'react';

function Execution() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const speed = useAppSelector((state) => state.sortViz.speed);
  const isPlaying = useAppSelector((state) => state.sortViz.isPlaying);
  const reset = useAppSelector((state) => state.sortViz.reset);

  useEffect(() => {
    if (isPlaying) {
      dispatch(startTimer());
    }
  }, [dispatch, isPlaying]);

  useEffect(() => {
    dispatch(setIsPlaying(false));
  }, [dispatch, reset]);

  useEffect(() => {
    dispatch(setSpeed(speed));
  }, [dispatch, speed]);

  return (
    <div className={classes.controls}>
      <button
        data-testid="player"
        onClick={() => dispatch(setIsPlaying(!isPlaying))}
        disabled={array.length === 0 || isPlaying === null}
        data-tooltip={isPlaying ? 'Pause' : 'Play'}
      >
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt={isPlaying ? 'Pause' : 'Play'}
          height={24}
          width={24}
        />
      </button>

      <button
        onClick={() => dispatch(setReset())}
        disabled={array.length === 0}
        data-tooltip="Reset"
      >
        <img src={resetIcon} height={24} width={24} />
      </button>

      <input
        id="speed"
        data-tooltip="Animation speed"
        type="range"
        min={1}
        max={20}
        value={speed}
        step={1}
        onChange={(e) => dispatch(setSpeed(e.target.valueAsNumber))}
      />
    </div>
  );
}

export default Execution;
