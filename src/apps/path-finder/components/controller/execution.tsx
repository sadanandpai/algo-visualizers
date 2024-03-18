import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { clearGrid, setVisitedCellCount } from '@pathFinder/store/path-finder.slice';
import { Play, RefreshCcw } from 'lucide-react';
import classes from './controller.module.scss';

import { useDebounce } from 'react-use';
import { pathFinders } from '@pathFinder/algorithms';
import { speeds } from '@pathFinder/config';
import { Status } from '@pathFinder/models/interfaces';
import { searchPath } from '@pathFinder/store/search-thunk';

interface Props {
  defaultSpeed: string;
}

function Execution({ defaultSpeed }: Props) {
  const dispatch = useAppDispatch();
  const [pathFinder, setPathFinder] = useState('');
  const [speed, setSpeed] = useState(speeds.get(defaultSpeed)!);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const status = useAppSelector((state) => state.pathFinder.status);
  const pathFinderAlgo = pathFinder ? pathFinders.get(pathFinder) : null;
  const disabled = status === Status.Generating || status === Status.Searching;

  function handlePlay(algo = pathFinderAlgo) {
    if (status === Status.Complete) {
      dispatch(clearGrid());
    }

    if (algo) {
      dispatch(searchPath(algo.fn, speed));
    }
  }

  function handleClear() {
    dispatch(clearGrid());
    dispatch(setVisitedCellCount(0));
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (status === Status.Searching) {
      return;
    }

    const algo = e.target.value;
    if (algo) {
      setPathFinder(algo);
      handlePlay(pathFinders.get(algo));
    }
  }

  useDebounce(
    () => {
      if (status === Status.Complete && pathFinderAlgo) {
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
        className={classes.pathFinder}
        name="path-finder"
        id="maze"
        value={pathFinder}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="" disabled>
          Select a Path finder
        </option>
        {[...pathFinders.entries()].map(([key, { name }]) => (
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
        {[...speeds.entries()].map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>

      <button
        className={classes.play}
        data-testid="player"
        disabled={disabled || !pathFinder}
        data-tooltip="Play"
        onClick={() => handlePlay()}
      >
        <Play size={20} />
      </button>

      <button
        data-testid="clear"
        onClick={handleClear}
        disabled={status === Status.Generating}
        data-tooltip="clear"
      >
        <RefreshCcw size={20} />
      </button>
    </div>
  );
}

export default Execution;
