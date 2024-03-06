import { generateMaze, setMazeGenerator } from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import classes from './controller.module.scss';
import { mazeGenerators } from '../../algorithms/maze-generator';

function Operations() {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.pathFinder.isPlaying);
  const mazeAlgoName = useAppSelector(
    (state) => state.pathFinder.mazeGenerator
  );

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
      </div>
    </>
  );
}

export default Operations;
