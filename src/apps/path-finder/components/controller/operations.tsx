import {
  generateMaze,
  setClickType,
  setMazeGenerator,
} from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import { AppState } from '../../models/interfaces';
import classes from './controller.module.scss';
import { mazeGenerators } from '../../algorithms/maze-generator';

const buttons = ['clear', 'entry', 'exit', 'wall'];

function Operations() {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.pathFinder.isPlaying);
  const clickType = useAppSelector((state) => state.pathFinder.clickType);
  const mazeAlgoName = useAppSelector(
    (state) => state.pathFinder.mazeGenerator
  );

  const handleBtnClick = (type: AppState['clickType']) => {
    dispatch(setClickType(type));
  };

  return (
    <>
      <div className={classes.cellControls}>
        <select
          name="maze"
          id="maze"
          value={mazeAlgoName}
          onChange={(e) => dispatch(setMazeGenerator(e.target.value))}
        >
          {[...mazeGenerators.entries()].map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>

        <button
          onClick={() => dispatch(generateMaze())}
          disabled={isPlaying}
          className="primary"
        >
          Maze
        </button>

        <div className={classes.clickTypes}>
          {buttons.map((btn, idx) => (
            <button
              key={btn}
              onClick={() => handleBtnClick(idx)}
              disabled={isPlaying}
              className={`primary-outline ${classes[btn]} ${
                clickType === idx ? classes.active : ''
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Operations;
