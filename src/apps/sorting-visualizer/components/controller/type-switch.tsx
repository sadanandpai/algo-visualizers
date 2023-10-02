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
      <label>Cell</label>
      <Switch
        id="visualizerType"
        onChange={() => dispatch(toggleVisualizerType())}
        checked={visualizerType === "bar"}
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={40}
        offColor="#2b4bfe"
        onColor="#2b4bfe"
      />
      <label>Bar</label>
    </div>
  );
}

export default TypeSwitch;
