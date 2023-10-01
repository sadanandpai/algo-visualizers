import { AppState, ClickType } from "../../models/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import classes from "./controller.module.scss";
import { setClickType } from "../../store/path-finder.slice";

function Operations() {
  const dispatch = useAppDispatch();
  const clickType = useAppSelector((state) => state.pathFinder.clickType);

  const buttons = ["clear", "start", "end", "wall"];

  const handleBtnClick = (type: AppState["clickType"]) => {
    dispatch(setClickType(type));
  };

  return (
    <section className={classes.operations}>
      <div>
        {buttons.map((btn, idx) => (
          <button
            key={btn}
            onClick={() => handleBtnClick(idx)}
            className={clickType === idx ? classes.active : ""}
          >
            {btn}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Operations;
