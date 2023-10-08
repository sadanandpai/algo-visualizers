import { searchPath, setClickType } from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { AppState } from '../../models/interfaces';
import classes from './controller.module.scss';

function Operations() {
  const dispatch = useAppDispatch();
  const clickType = useAppSelector((state) => state.pathFinder.clickType);

  const buttons = ['clear', 'start', 'end', 'wall'];

  const handleBtnClick = (type: AppState['clickType']) => {
    dispatch(setClickType(type));
  };

  return (
    <section className={classes.operations}>
      <div>
        {buttons.map((btn, idx) => (
          <button
            key={btn}
            onClick={() => handleBtnClick(idx)}
            className={clickType === idx ? classes.active : ''}
          >
            {btn}
          </button>
        ))}
      </div>

      <div>
        <button onClick={() => dispatch(searchPath())}>Search</button>
      </div>
    </section>
  );
}

export default Operations;
