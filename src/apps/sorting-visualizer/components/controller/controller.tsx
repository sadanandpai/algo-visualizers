import {
  setIsPlaying,
  setReset,
} from '@/apps/sorting-visualizer/store/sorting-visualizer.slice';

import ArrayInput from './array-input';
import Execution from './execution';
import TypeSwitch from './type-switch';
import classes from './controls.module.scss';
import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      <TypeSwitch />
    </section>
  );
}

export default Controller;
