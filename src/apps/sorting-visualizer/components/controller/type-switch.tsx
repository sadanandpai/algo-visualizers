import {
  setIsPlaying,
  setReset,
  toggleVisualizerType,
} from "@/apps/sorting-visualizer/store/sorting-visualizer.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import Switch from "react-switch";
import classes from "./controls.module.scss";
import { useEffect } from "react";

function TypeSwitch() {
  const dispatch = useAppDispatch();
  const visualizerType = useAppSelector(
    (state) => state.sortViz.visualizerType
  );

  useEffect(() => {
    dispatch(setIsPlaying(false));
    dispatch(setReset());
  }, [visualizerType, dispatch]);

  return (
    <div className={classes.switchContainer}>
      Cell
      <Switch
        onChange={() => dispatch(toggleVisualizerType())}
        checked={visualizerType === "bar"}
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={40}
      />
      Bar
    </div>
  );
}

export default TypeSwitch;
