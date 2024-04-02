import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useDebounce } from 'react-use';
import {
  clearGrid,
  setGrid,
  setPathLength,
  setStatus,
  setVisitedCellCount,
} from '@pathFinder/store/path-finder.slice';
import { Play, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import classes from './controller.module.scss';

import { pathFinders } from '@pathFinder/algorithms';
import { pathSearchAlgoInfo } from '@pathFinder/components/modal-icon/modal-content';
import { speeds } from '@pathFinder/config';
import { Speed, Status } from '@pathFinder/models';
import { highlightPath } from '@pathFinder/store/path.thunk';
import { searchPath } from '@pathFinder/store/search.thunk';
import Modals from '@pathFinder/components/modal-icon/modals';

interface Props {
  defaultSpeed: Speed;
}

function PathControls({ defaultSpeed }: Props) {
  const dispatch = useAppDispatch();
  const [pathFinder, setPathFinder] = useState('');
  const [speed, setSpeed] = useState(speeds.get(defaultSpeed) as number);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const status = useAppSelector((state) => state.pathFinder.status);
  const pathFinderAlgo = pathFinder ? pathFinders.get(pathFinder) : null;
  const disabled = status === Status.Generating || status === Status.Searching;

  async function executeSearch(algo: typeof pathFinderAlgo, speed: number) {
    if (status === Status.Complete) {
      dispatch(clearGrid());
    }

    if (!algo) {
      return;
    }

    try {
      dispatch(setVisitedCellCount(0));
      dispatch(setPathLength(0));
      dispatch(setStatus(Status.Searching));
      const { grid, parents } = await dispatch(searchPath(algo.fn, speed));
      await dispatch(highlightPath(grid, parents, speed));
      dispatch(setGrid({ grid, clone: false }));
      dispatch(setStatus(Status.Complete));
    } catch {
      // search cancelled
      // no action needed
    }
  }

  async function handlePlay(algo = pathFinderAlgo) {
    await executeSearch(algo, speed);
  }

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const algo = e.target.value;
    setPathFinder(algo);
    await executeSearch(pathFinders.get(algo), speed);
  }

  function handleClear() {
    dispatch(clearGrid());
    dispatch(setVisitedCellCount(0));
    dispatch(setPathLength(0));
  }

  useDebounce(
    async () => {
      if (status === Status.Complete) {
        await executeSearch(pathFinderAlgo, 0);
      }
    },
    333,
    [entry, exit]
  );

  return (
    <div className={classes.execution + ' execution'}>
      <Modals content={pathSearchAlgoInfo} />
      <select
        className={classes.pathFinder}
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
        className={`${classes.speed}`}
        name="path-finder-speed"
        id="path-finder-speed"
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
        className={`${classes.play}`}
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

export default PathControls;
