import {
  useAppDispatch,
  useAppSelector,
} from "@/sorting-visualizer/hooks/hooks";

import classes from "./controls.module.scss";
import { setSelectedList } from "@/sorting-visualizer/store/app.slice";
import { useState } from "react";

function AlgoSelection() {
  const dispatch = useAppDispatch();
  const selectedAlgo = useAppSelector((state) => state.app.selectedList);
  const [checkedState, setCheckedState] = useState(selectedAlgo);

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position
        ? { ...item, selected: !item?.selected }
        : { ...item, selected: item?.selected }
    );
    dispatch(setSelectedList(updatedCheckedState));
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className={classes.checkboxWrapper}>
      {selectedAlgo.map(({ name, selected }, index) => {
        return (
          <li key={name} className={classes.listItem}>
            <div className={classes.checkbox}>
              <input
                type="checkbox"
                id={`custom-checkbox-${name}`}
                name={name}
                value={name}
                checked={selected}
                onChange={() => handleOnChange(index)}
              />
              <label htmlFor={`custom-checkbox-${name}`}>{name}</label>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default AlgoSelection;
