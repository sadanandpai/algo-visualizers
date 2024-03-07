import {
  resetGrid,
  resetGridSearch,
  setPathFinder,
} from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import classes from './controller.module.scss';
import { pathFinders } from '../../algorithms/path-finder';
import playIcon from '/icons/play.svg';
import resetIcon from '/icons/reset.svg';
import { searchPath } from '../../store/thunk';
import { useDebounce } from 'react-use';

function Execution() {
  const dispatch = useAppDispatch();
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const isTriggered = useAppSelector((state) => state.pathFinder.isTriggered);
  const pathFinderKey = useAppSelector((state) => state.pathFinder.pathFinder);

  useDebounce(
    () => {
      if (isTriggered) {
        dispatch(resetGridSearch());
        dispatch(searchPath(0));
      }
    },
    333,
    [entry, exit]
  );

  return (
    <div className={classes.execution}>
      <select
        name="path-finder"
        id="maze"
        value={pathFinderKey}
        onChange={(e) => dispatch(setPathFinder(e.target.value))}
      >
        {[...pathFinders.entries()].map(([key, { name }]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>

      <button
        data-testid="player"
        onClick={() => dispatch(searchPath(50))}
        disabled={isTriggered}
        data-tooltip="Play"
      >
        <img src={playIcon} alt="Play" height={24} width={24} />
      </button>

      <button
        data-testid="reset"
        onClick={() => dispatch(resetGrid())}
        data-tooltip="Reset"
      >
        <img src={resetIcon} alt="Reset" height={24} width={24} />
      </button>
    </div>
  );
}

export default Execution;
