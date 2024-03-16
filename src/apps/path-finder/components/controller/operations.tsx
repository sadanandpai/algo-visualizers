import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useState } from 'react';
import { Status } from '../../models/interfaces';
import classes from './controller.module.scss';
import { generateMaze } from '../../store/maze.thunk';
import { Play, Trash } from 'lucide-react';
import { resetGrid } from '../../store/path-finder.slice';
import { mazeGenerators } from '../../algorithms';
import { mazeSpeeds } from '../../config';

function Operations() {
  const dispatch = useAppDispatch();
  const [speed, setSpeed] = useState([...mazeSpeeds.values()][1]);
  const [maze, setMaze] = useState([...mazeGenerators.keys()][0]);
  const status = useAppSelector((state) => state.pathFinder.status);
  const mazeAlgo = mazeGenerators.get(maze);
  const disabled = status === Status.Generating || status === Status.Searching;

  function mazeClickHandler(algo = mazeAlgo) {
    if (algo) {
      dispatch(generateMaze(algo.fn, speed));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const algo = e.target.value;
    setMaze(algo);
    mazeClickHandler(mazeGenerators.get(algo));
  }

  return (
    <div className={classes.operation}>
      <select
        name="maze"
        id="maze"
        value={maze}
        onChange={handleChange}
        className={classes.mazeSelector}
        disabled={disabled}
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
        disabled={disabled}
      >
        {[...mazeSpeeds.entries()].map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>

      <button
        className={classes.play}
        data-testid="generate-maze"
        onClick={() => mazeClickHandler()}
        data-tooltip="Play"
        disabled={disabled}
      >
        <Play size={20} />
      </button>

      <button
        data-testid="reset"
        onClick={() => dispatch(resetGrid())}
        data-tooltip="Reset"
      >
        <Trash size={20} />
      </button>
    </div>
  );
}

export default Operations;
