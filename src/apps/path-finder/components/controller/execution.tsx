import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { clearGrid } from '../../store/path-finder.slice';

import { Play, RefreshCcw } from 'lucide-react';
import classes from './controller.module.scss';

import { useState } from 'react';
import { useDebounce, useWindowSize } from 'react-use';
import { Status } from '../../models/interfaces';
import { searchPath } from '../../store/search-thunk';
import { pathFinders } from '../../algorithms';

const speeds = new Map([
  ['∞', 0],
  ['4x', 1],
  ['2x', 20],
  ['1x', 30],
  ['0.5x', 50],
  ['0.1x', 250],
]);

function Execution() {
  const dispatch = useAppDispatch();
  const [pathFinder, setPathFinder] = useState([...pathFinders.keys()][0]);
  const [speed, setSpeed] = useState([...speeds.values()][1]);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const status = useAppSelector((state) => state.pathFinder.status);
  const pathFinderAlgo = pathFinders.get(pathFinder)!;
  const { width } = useWindowSize();

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

  function handlePlay() {
    if (status === Status.Complete) {
      dispatch(clearGrid());
    }
    dispatch(searchPath(pathFinderAlgo.fn, speed));
  }

  return (
    <div className={classes.execution}>
      <select
        name="path-finder"
        id="maze"
        value={pathFinder}
        onChange={(e) => setPathFinder(e.target.value)}
      >
        {[...pathFinders.entries()].map(([key, { name, fullName }]) => (
          <option key={key} value={key}>
            {width > 1024 ? fullName : name}
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
        data-testid="player"
        onClick={handlePlay}
        disabled={status === Status.Generating || status === Status.Searching}
        data-tooltip="Play"
      >
        <Play size={24} />
      </button>

      <button
        data-testid="clear"
        onClick={() => dispatch(clearGrid())}
        disabled={status === Status.Generating}
        data-tooltip="clear"
      >
        <RefreshCcw size={24} />
      </button>
    </div>
  );
}

export default Execution;
