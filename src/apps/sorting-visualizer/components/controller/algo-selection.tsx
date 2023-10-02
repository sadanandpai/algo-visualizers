import {
  modifyAlgoSelection,
  setReset,
} from '@/apps/sorting-visualizer/store/sorting-visualizer.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { algoList } from '@/apps/sorting-visualizer/sorting-algorithms/algo-list';
import classes from './controls.module.scss';

function AlgoSelection() {
  const dispatch = useAppDispatch();
  const selectedAlgosStatus = useAppSelector(
    (state) => state.sortViz.selectedAlgosStatus
  );

  const handleOnChange = (position: number) => {
    dispatch(modifyAlgoSelection(position));
    dispatch(setReset());
  };

  return (
    <div className={classes.checkboxWrapper}>
      {selectedAlgosStatus.map((checked, idx) => (
        <li key={idx} className={classes.listItem}>
          <div className={classes.checkbox}>
            <input
              type="checkbox"
              id={`custom-checkbox-${algoList[idx].name}`}
              name={algoList[idx].name}
              value={algoList[idx].name}
              checked={checked}
              onChange={() => handleOnChange(idx)}
            />
            <label htmlFor={`custom-checkbox-${algoList[idx].name}`}>
              {algoList[idx].name}
            </label>
          </div>
        </li>
      ))}
    </div>
  );
}

export default AlgoSelection;
