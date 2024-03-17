import { setCell } from '@pathFinder/store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useCallback, useEffect, useRef } from 'react';

import { CellElement, CellType, Status } from '@pathFinder/models/interfaces';
import { cellSize } from '@pathFinder/config';
import classes from './grid.module.scss';
import { useTouch } from '@pathFinder/hooks/use-touch.hook';
import { useMouse } from '@pathFinder/hooks/use-mouse.hook';
import { isTouchDevice } from '@pathFinder/helpers/action.helper';

function Grid() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => state.pathFinder.grid);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const status = useAppSelector((state) => state.pathFinder.status);
  const ref = useRef<HTMLDivElement>(null);

  const touchCell = useTouch({ isMobile: isTouchDevice(), ref });
  const moveCell = useMouse({ isMobile: isTouchDevice(), ref });

  const setupCell = useCallback(
    function setupCell(cell: CellElement | null) {
      if (cell) {
        const type = cell.cellType === CellType.entry ? entry : exit;
        const isEntryOrExit = [CellType.entry, CellType.exit].includes(
          cell.cellType
        );
        if (
          isEntryOrExit &&
          !(cell.row === type.row && cell.col === type.col)
        ) {
          dispatch(setCell({ ...type, cellType: CellType.clear }));
        }

        if (!(type.row === cell.row && type.col === cell.col)) {
          dispatch(setCell(cell));
        }
      }
    },
    [dispatch, entry, exit]
  );

  useEffect(() => {
    setupCell(touchCell);
  }, [touchCell, setupCell]);

  useEffect(() => {
    setupCell(moveCell);
  }, [moveCell, setupCell]);

  const gridStyle: React.CSSProperties = {
    gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
    gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
  };

  return (
    <div className={classes.grid} style={gridStyle} ref={ref}>
      {grid.map((row, rowIndex) =>
        row.map((cellType, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            data-row={rowIndex}
            data-col={colIndex}
            data-cell-type={cellType}
            className={classes['type' + cellType]}
            disabled={status === Status.Searching}
          ></button>
        ))
      )}
    </div>
  );
}

export default Grid;
