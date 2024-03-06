import { setCell } from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useEffect, useRef } from 'react';

import { CellType } from '../../models/interfaces';
import { cellSize } from '../../config';
import classes from './grid.module.scss';
import useMouseAction from '../../hooks/useMouseAction.hook';

const getCellDetails = (element: HTMLElement | null) => {
  if (!element) {
    return { isValidCell: false };
  }

  if (element.tagName !== 'BUTTON') {
    return { isValidCell: false };
  }

  const row = +(element.dataset.row ?? -1);
  const col = +(element.dataset.col ?? -1);
  const cellType = +(element.dataset.cellType ?? 0);

  if (row === -1 || col === -1 || cellType === -1) {
    return { isValidCell: false };
  }

  return {
    isValidCell: true,
    row,
    col,
    cellType,
  };
};

function Grid() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => state.pathFinder.grid);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const isPlaying = useAppSelector((state) => state.pathFinder.isPlaying);
  const ref = useRef<HTMLDivElement>(null);
  const cellTypeRef = useRef<CellType | null>(null);

  const { element, isMouseDown } = useMouseAction(ref);
  const { isValidCell, row, col, cellType } = getCellDetails(element);

  useEffect(() => {
    if (
      isMouseDown &&
      isValidCell &&
      [CellType.entry, CellType.exit].includes(cellType!)
    ) {
      cellTypeRef.current = cellType!;
    }

    if (!isMouseDown) {
      cellTypeRef.current = null;
    }
  }, [isMouseDown, isValidCell, cellType]);

  useEffect(() => {
    if (!isValidCell) {
      return;
    }

    if (cellTypeRef.current) {
      const cell = cellTypeRef.current === CellType.entry ? entry : exit;

      if (cell && (cell.row !== row || cell.col !== col)) {
        dispatch(
          setCell({
            row: cell?.row,
            col: cell?.col,
            cellType: CellType.clear,
          })
        );

        dispatch(
          setCell({ row: row!, col: col!, cellType: cellTypeRef.current })
        );
      }
    } else {
      dispatch(
        setCell({
          row: row!,
          col: col!,
          cellType:
            cellType === CellType.clear ? CellType.wall : CellType.clear,
        })
      );
    }
  }, [cellType, col, dispatch, element, isValidCell, row, entry, exit]);

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
            disabled={isPlaying}
          ></button>
        ))
      )}
    </div>
  );
}

export default Grid;
