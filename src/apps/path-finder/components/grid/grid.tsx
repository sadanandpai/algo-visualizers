import { setCell, setEntry, setExit } from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useEffect, useRef } from 'react';

import { ClickType } from '../../models/interfaces';
import classes from './grid.module.scss';
import useMouseAction from '../../hooks/useMouseAction.hook';

function Grid() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => state.pathFinder.grid);
  const clickType = useAppSelector((state) => state.pathFinder.clickType);
  const isPlaying = useAppSelector((state) => state.pathFinder.isPlaying);
  const ref = useRef<HTMLDivElement>(null);

  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${grid.length}, 30px)`,
    gridTemplateColumns: `repeat(${grid[0].length}, 30px)`,
  };

  const clickIdx = useMouseAction(ref);

  useEffect(() => {
    if (clickIdx) {
      switch (clickType) {
        case ClickType.entry:
          dispatch(setEntry(clickIdx));
          break;
        case ClickType.exit:
          dispatch(setExit(clickIdx));
          break;
        default:
          dispatch(setCell(clickIdx));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            disabled={isPlaying}
          ></button>
        ))
      )}
    </div>
  );
}

export default Grid;
