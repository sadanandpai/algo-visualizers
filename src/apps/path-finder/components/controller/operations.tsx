import { generateMaze, setMazeGenerator } from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import classes from './controller.module.scss';
import { mazeGenerators } from '../../algorithms/maze-generator';
import { Status } from '../../models/interfaces';

function Operations() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.pathFinder.status);
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
          disabled={status !== Status.Ready}
          className="primary"
        >
          Maze
        </button>
      </div>
    </>
  );
}

export default Operations;
