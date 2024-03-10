import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { clearGrid, resetGrid } from '../../store/path-finder.slice';

import { Play, RefreshCcw, Trash } from 'lucide-react';
import { pathFinders } from '../../algorithms/path-finder';
import classes from './controller.module.scss';

import { useState } from 'react';
import { useDebounce } from 'react-use';
import { Status } from '../../models/interfaces';
import { searchPath } from '../../store/search-thunk';

const speeds = new Map([
  ['0.5x', 50],
  ['0.75x', 40],
  ['1x', 30],
  ['2x', 20],
  ['4x', 1],
  ['xx', 0],
]);

function Execution() {
  const dispatch = useAppDispatch();
  const [pathFinder, setPathFinder] = useState([...pathFinders.keys()][0]);
  const [speed, setSpeed] = useState([...speeds.values()][2]);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const status = useAppSelector((state) => state.pathFinder.status);
  const pathFinderAlgo = pathFinders.get(pathFinder)!;

  useDebounce(
    () => {
      if (status === Status.Complete) {
        dispatch(clearGrid());
        dispatch(searchPath(pathFinderAlgo.fn, 0));
      }
    },
    333,
    [entry, exit]
  );

  return (
    <div className={classes.execution}>
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

      <select
        name="path-finder"
        id="maze"
        value={pathFinder}
        onChange={(e) => setPathFinder(e.target.value)}
      >
        {[...pathFinders.entries()].map(([key, { name }]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>

      <button
        data-testid="player"
        onClick={() => dispatch(searchPath(pathFinderAlgo?.fn, speed))}
        disabled={status !== Status.Ready}
        data-tooltip="Play"
      >
        <Play size={24} />
      </button>

      <button
        data-testid="clear"
        onClick={() => dispatch(clearGrid())}
        data-tooltip="clear"
      >
        <RefreshCcw size={24} />
      </button>

      <button
        data-testid="reset"
        onClick={() => dispatch(resetGrid())}
        data-tooltip="Reset"
      >
        <Trash size={24} />
      </button>
    </div>
  );
}

export default Execution;
