import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { AppState } from "../../models/interfaces";
import classes from "./controller.module.scss";
import { setClickType } from "../../store/path-finder.slice";

function Operations() {
  const dispatch = useAppDispatch();
  const clickType = useAppSelector((state) => state.pathFinder.clickType);

  const buttons: AppState["clickType"][] = ["entry", "exit", "wall", "clear"];

  const handleBtnClick = (type: AppState["clickType"]) => {
    dispatch(setClickType(type));
  };

  return (
    <section className={classes.operations}>
      <div>
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleBtnClick(btn)}
            className={clickType === btn ? classes.active : ""}
          >
            {btn}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Operations;
