import { setIsPlaying, setReset } from "@/sorting-visualizer/store/app.slice";

import ArrayInput from "./ArrayInput";
import Execution from "./Execution";
import classes from "./controls.module.scss";
import { useAppDispatch } from "@/sorting-visualizer/hooks/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Controller() {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsPlaying(false));
    dispatch(setReset());
  }, [algoName, dispatch]);

  return (
    <section className={classes.controllerWrapper}>
      <div className={classes.controller}>
        <ArrayInput />
        <Execution />
      </div>
    </section>
  );
}

export default Controller;
