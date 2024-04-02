import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { Play, Trash } from 'lucide-react';
import { mazeGenerators } from '@pathFinder/algorithms';
import { mazeAlgoInfo } from '@pathFinder/components/modal-icon/modal-content';
import Modals from '@pathFinder/components/modal-icon/modals';
import { speeds } from '@pathFinder/config';
import { Speed, Status } from '@pathFinder/models';
import { generateMaze } from '@pathFinder/store/maze.thunk';
import {
  resetGrid,
  setPathLength,
  setVisitedCellCount,
} from '@pathFinder/store/path-finder.slice';
import classes from './controller.module.scss';

interface Props {
  defaultSpeed: Speed;
}

function MazeControls({ defaultSpeed }: Props) {
  const dispatch = useAppDispatch();
  const [maze, setMaze] = useState<string>('');
  const [speed, setSpeed] = useState(speeds.get(defaultSpeed) as number);
  const status = useAppSelector((state) => state.pathFinder.status);
  const mazeAlgo = maze ? mazeGenerators.get(maze) : null;
  const disabled = status === Status.Generating || status === Status.Searching;

  function mazeClickHandler(algo = mazeAlgo) {
    if (algo) {
      dispatch(generateMaze(algo.fn, speed));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const algo = e.target.value;
    if (!algo) {
      return;
    }

    setMaze(algo);
    mazeClickHandler(mazeGenerators.get(algo));
  }
  function handleReset() {
    dispatch(resetGrid());
    dispatch(setVisitedCellCount(0));
    dispatch(setPathLength(0));
  }
  return (
    <div className={classes.operation + ' select-maze'}>
      <Modals content={mazeAlgoInfo} />

      <select
        name="maze"
        id="maze"
        value={maze}
        onChange={handleChange}
        className={classes.mazeSelector}
        disabled={disabled}
      >
        <option value="" disabled>
          Select a Maze
        </option>
        {[...mazeGenerators.entries()].map(([key, { name }]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>

      <select
        className={classes.speed}
        name="maze-speed"
        id="maze-speed"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        disabled={disabled}
      >
        {[...speeds.entries()].map(([key, value]) => (
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
        disabled={disabled || !maze}
      >
        <Play size={20} />
      </button>

      <button data-testid="reset" onClick={handleReset} data-tooltip="Reset">
        <Trash size={20} />
      </button>
    </div>
  );
}

export default MazeControls;
