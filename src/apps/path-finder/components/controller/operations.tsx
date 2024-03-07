import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useState } from 'react';
import { mazeGenerators } from '../../algorithms/maze-generator';
import { Status } from '../../models/interfaces';
import { setGrid } from '../../store/path-finder.slice';
import classes from './controller.module.scss';

function Operations() {
  const dispatch = useAppDispatch();
  const [maze, setMaze] = useState([...mazeGenerators.keys()][0]);
  const rows = useAppSelector((state) => state.pathFinder.rows);
  const cols = useAppSelector((state) => state.pathFinder.cols);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const status = useAppSelector((state) => state.pathFinder.status);
  const mazeAlgo = mazeGenerators.get(maze);

  function generateMaze() {
    const grid = mazeAlgo?.fn(rows, cols, entry, exit);
    if (grid) {
      dispatch(setGrid(grid));
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
          onClick={() => generateMaze()}
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
