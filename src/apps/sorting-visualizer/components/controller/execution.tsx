import {
  setIsPlaying,
  setReset,
  setSpeed,
  startTimer,
} from "@/apps/sorting-visualizer/store/sorting-visualizer.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import classes from "./controls.module.scss";
import pauseIcon from "/pause.svg";
import playIcon from "/play.svg";
import resetIcon from "/reset.svg";
import { useEffect } from "react";
import Tooltip from "../tooltip/tooltip";

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
      <Tooltip text={isPlaying ? "Pause" : "Play"}>
      <button
        onClick={() => dispatch(setIsPlaying(!isPlaying))}
        disabled={array.length === 0 || isPlaying === null}
      >
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt={isPlaying ? "Pause" : "Play"}
          height={24}
          width={24}
        />
      </button>
      </Tooltip>

      <Tooltip text={"Reset"}>
      <button
        onClick={() => dispatch(setReset())}
        disabled={array.length === 0}
      >
        <img src={resetIcon} height={24} width={24} />
      </button>
      </Tooltip>

      <Tooltip text={"Animation speed"}>
      <input
        type="range"
        min={1}
        max={20}
        value={speed}
        step={1}
        onChange={(e) => dispatch(setSpeed(e.target.valueAsNumber))}
      />
      </Tooltip>
    </div>
  );
}

export default Execution;
