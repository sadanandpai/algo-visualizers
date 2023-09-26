import {
  setIsPlaying,
  setReset,
  startTimer,
} from "@/sorting-visualizer/store/app.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/sorting-visualizer/hooks/hooks";

import classes from "./controls.module.scss";
import { setSpeed } from "@/sorting-visualizer/store/global";
import { useEffect } from "react";

function Execution() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.app.array);
  const isPlaying = useAppSelector((state) => state.app.isPlaying);
  const reset = useAppSelector((state) => state.app.reset);

  useEffect(() => {
    if (isPlaying) {
      dispatch(startTimer());
    }
  }, [dispatch, isPlaying]);

  useEffect(() => {
    dispatch(setIsPlaying(false));
  }, [dispatch, reset]);

  return (
    <div className={classes.controls}>
      <button
        onClick={() => dispatch(setIsPlaying(!isPlaying))}
        disabled={array.length === 0 || isPlaying === null}
      >
        <img
          src={isPlaying ? "/pause.svg" : "/play.svg"}
          alt={isPlaying ? "Pause" : "Play"}
          height={24}
          width={24}
        />
      </button>

      <button
        onClick={() => dispatch(setReset())}
        disabled={array.length === 0}
      >
        <img src="/reset.svg" height={24} width={24} />
      </button>

      <input
        type="range"
        min={1}
        max={10}
        defaultValue={1}
        step={1}
        onChange={(e) => setSpeed(e.target.valueAsNumber)}
      />
    </div>
  );
}

export default Execution;
