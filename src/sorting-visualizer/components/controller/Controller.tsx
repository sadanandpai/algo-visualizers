import { setIsPlaying, setReset } from "@/sorting-visualizer/store/app.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/sorting-visualizer/hooks/hooks";

import AlgoSelection from "./Selection";
import ArrayInput from "./ArrayInput";
import Execution from "./Execution";
import classes from "./controls.module.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Controller() {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.app.array);

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

      {algoName === "all" && array?.length > 0 && <AlgoSelection />}
    </section>
  );
}

export default Controller;
