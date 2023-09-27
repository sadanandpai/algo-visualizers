import {
  convertArrayStringToArray,
  convertInputToArrayString,
  getRndmNumInRange,
} from "@/apps/sorting-visualizer/helpers/array-helpers";
import {
  setArray,
  setIsPlaying,
  setReset,
} from "@/apps/sorting-visualizer/store/sorting-visualizer.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

import classes from "./controls.module.scss";

function ArrayInput() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const [input, setInput] = useState(array.join(", "));

  useEffect(() => {
    dispatch(setIsPlaying(false));
    dispatch(setReset());
  }, [array, dispatch]);

  const onRandomize = () => {
    const newInput = Array.from(new Array(getRndmNumInRange(5, 20)), () =>
      getRndmNumInRange()
    );
    setInput(newInput.join(", "));
    dispatch(setArray(newInput));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAsStr = convertInputToArrayString(e.target.value);
    setInput(inputAsStr);
    dispatch(setArray(convertArrayStringToArray(inputAsStr)));
  };

  return (
    <div className={classes.numbers}>
      <button className={classes.rndmBtn} onClick={onRandomize}>
        Randomize
      </button>
      <input
        className={classes.input}
        type="text"
        placeholder="Numbers to sort (comma separate - max 3 digits)"
        value={input}
        onChange={onChange}
      />
    </div>
  );
}

export default ArrayInput;
