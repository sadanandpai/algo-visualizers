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
  const isPlaying = useAppSelector((state) => state.pathFinder.isPlaying);
  const clickType = useAppSelector((state) => state.pathFinder.clickType);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);

  const buttons = ['clear', 'entry', 'exit', 'wall'];

  const handleBtnClick = (type: AppState['clickType']) => {
    dispatch(setClickType(type));
  };

  return (
    <>
      <div className={classes.cellControls}>
        <button
          onClick={() => dispatch(randomizeGrid())}
          disabled={isPlaying}
          className="primary"
        >
          Randomize
        </button>

        <div className={classes.clickType}>
          {buttons.map((btn, idx) => (
            <button
              key={btn}
              onClick={() => handleBtnClick(idx)}
              disabled={isPlaying}
              className={`primary-outline ${
                clickType === idx ? classes.active : ''
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className={classes.execution}>
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
