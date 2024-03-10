import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useState } from 'react';
import { mazeGenerators } from '../../algorithms/maze-generator';
import { Status } from '../../models/interfaces';
import classes from './controller.module.scss';
import { generateMaze } from '../../store/maze.thunk';

const speeds = new Map([
  ['xx', 0],
  ['4x', 1],
  ['2x', 10],
  ['1x', 25],
  ['0.75x', 50],
  ['0.5x', 100],
]);

function Operations() {
  const dispatch = useAppDispatch();
  const [speed, setSpeed] = useState([...speeds.values()][0]);
  const [maze, setMaze] = useState([...mazeGenerators.keys()][0]);
  const status = useAppSelector((state) => state.pathFinder.status);
  const mazeAlgo = mazeGenerators.get(maze);

  function mazeClickHandler() {
    if (mazeAlgo) {
      dispatch(generateMaze(mazeAlgo.fn, speed));
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

        <select
          className={classes.speed}
          name="speed"
          id="speed"
          value={speed}
          onChange={(e) => setSpeed(+e.target.value)}
        >
          {[...speeds.entries()].map(([key, value]) => (
            <option key={key} value={value}>
              {key}
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
