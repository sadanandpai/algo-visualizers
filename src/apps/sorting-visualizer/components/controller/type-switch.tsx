import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import Switch from 'react-switch';
import classes from './controls.module.scss';
import { toggleVisualizerType } from '@sortViz/store/sorting-visualizer.slice';

function TypeSwitch() {
  const dispatch = useAppDispatch();
  const visualizerType = useAppSelector(
    (state) => state.sortViz.visualizerType
  );

  return (
    <div className={classes.switchContainer}>
      <span>Cell</span>
      <Switch
        id="visualizerType"
        onChange={() => dispatch(toggleVisualizerType())}
        checked={visualizerType === 'bar'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={40}
        offColor="#2b4bfe"
        onColor="#2b4bfe"
      />
      <span>Bar</span>
    </div>
  );
}

export default TypeSwitch;
