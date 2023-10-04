import React, { useEffect, useState } from 'react';
import {
  convertArrayStringToArray,
  convertInputToArrayString,
} from '@/apps/sorting-visualizer/helpers/array-helpers';
import {
  setArray,
  setIsPlaying,
  setReset,
} from '@/apps/sorting-visualizer/store/sorting-visualizer.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import NumberGenerator from './number-generator';
import classes from './controls.module.scss';

function ArrayInput() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const [input, setInput] = useState(array.join(', '));

  useEffect(() => {
    dispatch(setIsPlaying(false));
    dispatch(setReset());
  }, [array, dispatch]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAsStr = convertInputToArrayString(e.target.value);
    setInput(inputAsStr);
    const inputAsArray = convertArrayStringToArray(inputAsStr);
    dispatch(setArray(inputAsArray));
  };

  return (
    <div className={classes.numbers}>
      <NumberGenerator setInput={setInput} />

      <input
        id="user-input"
        className={classes.arrayInput}
        type="text"
        placeholder="Numbers to sort (comma separate - max 3 digits)"
        value={input}
        onChange={onInputChange}
      />
    </div>
  );
}

export default ArrayInput;
