import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useRef } from 'react';

import classes from './grid.module.scss';
import { updateGrid } from '../../store/path-finder.slice';
import useMouseAction from '../../hooks/useMouseAction.hook';

function Grid() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => state.pathFinder.grid);
  const ref = useRef<HTMLDivElement>(null);

  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${grid.length}, 25px)`,
    gridTemplateColumns: `repeat(${grid[0].length}, 25px)`,
  };

  const clickIdx = useMouseAction(ref);

  useEffect(() => {
    if (clickIdx) {
      dispatch(updateGrid({ row: clickIdx?.row, col: clickIdx?.col }));
    }
  }, [clickIdx, dispatch]);

  return (
    <div className={classes.grid} style={gridStyle} ref={ref}>
      {grid.map((row, rowIndex) =>
        row.map((clickType, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            data-row={rowIndex}
            data-col={colIndex}
            className={classes['type' + clickType]}
            onClick={() =>
              dispatch(updateGrid({ row: rowIndex, col: colIndex }))
            }
          ></button>
        ))
      )}
    </div>
  );
}

export default Grid;
