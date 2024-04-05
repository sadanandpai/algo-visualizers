import classes from './grid.module.scss';
import { useAppSelector } from '@/host/store/hooks';
import { useRef } from 'react';
import { Status } from '@pathFinder/models';
import { cellSize } from '@pathFinder/config';
import { useTouch } from '@pathFinder/hooks/use-touch.hook';
import { useMouse } from '@pathFinder/hooks/use-mouse.hook';
import { isTouchDevice } from '@pathFinder/helpers/action.helper';

function Grid() {
  const grid = useAppSelector((state) => state.pathFinder.grid);
  const status = useAppSelector((state) => state.pathFinder.status);
  const ref = useRef<HTMLDivElement>(null);

  useMouse({ isMobile: isTouchDevice(), ref });
  useTouch({ isMobile: isTouchDevice(), ref });

  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
    gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
  };

  return (
    <div className={classes.grid} style={gridStyle} id="grid" ref={ref}>
      {grid.map((row, rowIndex) =>
        row.map((cellType, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            data-row={rowIndex}
            data-col={colIndex}
            data-cell-type={cellType}
            className={classes['type' + cellType]}
            disabled={
              status === Status.Searching || status === Status.Generating
            }
          ></button>
        ))
      )}
    </div>
  );
}

export default Grid;
