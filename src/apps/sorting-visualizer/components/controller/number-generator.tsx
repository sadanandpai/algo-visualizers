import React, { useState } from 'react';
import {
  configureArray,
  getRndmNumInRange,
} from '@sortViz/helpers/array-helpers';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import { NumberGenProps } from '@sortViz/models/interfaces';
import classes from './controls.module.scss';
import { numberGenerator as limits } from '@sortViz/config';
import { setArray } from '@sortViz/store/sorting-visualizer.slice';

const options = ['random', 'ascending', 'descending'];

function NumberGenerator({ setInput }: NumberGenProps) {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const [inputMode, setInputMode] = useState('random');

  const onGenerate = () => {
    let newInput = Array.from(
      new Array(getRndmNumInRange(limits.min, limits.max)),
      () => getRndmNumInRange()
    );

    if (inputMode !== 'random') {
      newInput = configureArray(inputMode, newInput);
    }

    setInput(newInput.join(', '));
    dispatch(setArray(newInput));
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    setInputMode(mode);
    const sortedArray = configureArray(mode, array);

    setInput(sortedArray.join(', '));
    dispatch(setArray(sortedArray));
  };

  return (
    <div className={classes.generator}>
      <button className={classes.rndmBtn} onClick={onGenerate}>
        Generate
      </button>

      <select
        className={classes.select}
        onChange={onChange}
        value={inputMode}
        name="sequence-type"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NumberGenerator;
