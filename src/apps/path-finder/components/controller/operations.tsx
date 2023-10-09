import {
  randomizeGrid,
  resetGrid,
  setClickType,
} from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { AppState } from '../../models/interfaces';
import classes from './controller.module.scss';
import playIcon from '/icons/play.svg';
import resetIcon from '/icons/reset.svg';
import { searchPath } from '../../store/thunk';

function Operations() {
  const dispatch = useAppDispatch();
  const clickType = useAppSelector((state) => state.pathFinder.clickType);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);

  const buttons = ['clear', 'entry', 'exit', 'wall'];

  const handleBtnClick = (type: AppState['clickType']) => {
    dispatch(setClickType(type));
  };

  return (
    <>
      <div>
        <button onClick={() => dispatch(randomizeGrid())}>Randomize</button>
        {buttons.map((btn, idx) => (
          <button
            key={btn}
            onClick={() => handleBtnClick(idx)}
            className={`${classes.clickType} ${
              clickType === idx ? classes.active : ''
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      <div>
        <button
          data-testid="player"
          onClick={() => dispatch(searchPath())}
          disabled={entry === null || exit === null}
          data-tooltip="Play"
        >
          <img src={playIcon} alt="Play" height={24} width={24} />
        </button>

        <button
          data-testid="reset"
          onClick={() => dispatch(resetGrid())}
          data-tooltip="Reset"
        >
          <img src={resetIcon} alt="Reset" height={24} width={24} />
        </button>
      </div>
    </>
  );
}

export default Operations;
