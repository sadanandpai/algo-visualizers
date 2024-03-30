import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import {
  clearGrid,
  setGrid,
  setPathLength,
  setStatus,
  setVisitedCellCount,
} from '@pathFinder/store/path-finder.slice';
import { Play, RefreshCcw } from 'lucide-react';
import classes from './controller.module.scss';

import { useDebounce } from 'react-use';
import { pathFinders } from '@pathFinder/algorithms';
import { speeds } from '@pathFinder/config';
import { Status } from '@pathFinder/models/interfaces';
import { searchPath } from '@/apps/path-finder/store/search.thunk';
import { highlightPath } from '../../store/path.thunk';

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

  async function executeSearch(algo: typeof pathFinderAlgo, speed: number) {
    if (status === Status.Complete) {
      dispatch(clearGrid());
    }

    try {
      dispatch(setVisitedCellCount(0));
      dispatch(setPathLength(0));
      dispatch(setStatus(Status.Searching));
      const { grid, parents } = await dispatch(searchPath(algo!.fn, speed));
      await dispatch(highlightPath(grid, parents, speed));
      dispatch(setGrid({ grid, clone: false }));
      dispatch(setStatus(Status.Complete));
    } catch {
      // search cancelled
      // no action needed
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const algo = e.target.value;
    if (algo) {
      setPathFinder(algo);
      handlePlay(pathFinders.get(algo));
    }
  }

  async function handlePlay(algo = pathFinderAlgo) {
    if (!algo) {
      return;
    }

    executeSearch(algo, speed);
  }

  function handleClear() {
    dispatch(clearGrid());
    dispatch(setVisitedCellCount(0));
    dispatch(setPathLength(0));
  }

  useDebounce(
    async () => {
      if (status === Status.Complete && pathFinderAlgo) {
        await executeSearch(pathFinderAlgo, 0);
      }
    },
    333,
    [entry, exit]
  );

  return (
    <div className={classes.execution}>
      <select
        className={`${classes.pathFinder} selectAlgo`}
        name="path-finder"
        id="path-finder"
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
        className={`${classes.speed} selectAlgoSpeed`}
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
        className={`${classes.play} startfindingPath`}
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
        className='resetPath'
      >
        <RefreshCcw size={20} />
      </button>
    </div>
  );
}

export default Execution;
