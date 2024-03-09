import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useState } from 'react';
import { mazeGenerators } from '../../algorithms/maze-generator';
import { Status } from '../../models/interfaces';
import classes from './controller.module.scss';
import { generateMaze } from '../../store/maze.thunk';

function Operations() {
  const dispatch = useAppDispatch();
  const [maze, setMaze] = useState([...mazeGenerators.keys()][0]);
  const status = useAppSelector((state) => state.pathFinder.status);
  const mazeAlgo = mazeGenerators.get(maze);

  function mazeClickHandler() {
    if (mazeAlgo) {
      dispatch(generateMaze(mazeAlgo.fn, 0));
    }
  }

  return (
    <>
      <div className={classes.cellControls}>
        <select
          name="maze"
          id="maze"
          value={maze}
          onChange={(e) => setMaze(e.target.value)}
        >
          {[...mazeGenerators.entries()].map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>

        <button
          onClick={mazeClickHandler}
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
