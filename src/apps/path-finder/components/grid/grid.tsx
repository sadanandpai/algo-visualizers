import { setCell } from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { useEffect, useRef } from 'react';

import { CellType, Status } from '../../models/interfaces';
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

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function Grid() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => state.pathFinder.grid);
  const entry = useAppSelector((state) => state.pathFinder.entry);
  const exit = useAppSelector((state) => state.pathFinder.exit);
  const status = useAppSelector((state) => state.pathFinder.status);
  const ref = useRef<HTMLDivElement>(null);
  const cellTypeRef = useRef<CellType | null>(null);
  const cellMoveRef = useRef<CellType | null>(null);

  const { element, isMouseDown } = useMouseAction(ref);
  const { isValidCell, row, col, cellType } = getCellDetails(element);

  useEffect(() => {
    if (!isTouchDevice()) {
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
    }
  }, [isMouseDown, isValidCell, cellType]);

  useEffect(() => {
    if (isTouchDevice() && isValidCell && isMouseDown) {
      if (
        [CellType.entry, CellType.exit].includes(cellType!) &&
        !cellMoveRef.current
      ) {
        cellMoveRef.current = cellType!;
      }
    }
  }, [isMouseDown, isValidCell, cellType]);

  useEffect(() => {
    if (!isValidCell || isTouchDevice()) {
      return;
    }

    if (cellTypeRef.current) {
      const cell = cellTypeRef.current === CellType.entry ? entry : exit;

      if (
        cell &&
        (cell.row !== row || cell.col !== col) &&
        cellType !== CellType.wall
      ) {
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
          cellType: cellType === CellType.wall ? CellType.clear : CellType.wall,
        })
      );
    }
  }, [cellType, col, dispatch, element, isValidCell, row, entry, exit]);

  useEffect(() => {
    if (!isValidCell || !isTouchDevice()) {
      return;
    }

    if (cellMoveRef.current) {
      const cell = cellMoveRef.current === CellType.entry ? entry : exit;

      if (
        cell &&
        (cell.row !== row || cell.col !== col) &&
        cellType !== CellType.wall
      ) {
        dispatch(
          setCell({ row: row!, col: col!, cellType: cellMoveRef.current })
        );

        dispatch(
          setCell({
            row: cell?.row,
            col: cell?.col,
            cellType: CellType.clear,
          })
        );

        cellMoveRef.current = null;
      }
    } else if (
      !(
        (row === entry.row && col === entry.col) ||
        (row === exit.row && col === exit.col)
      )
    ) {
      dispatch(
        setCell({
          row: row!,
          col: col!,
          cellType: cellType === CellType.wall ? CellType.clear : CellType.wall,
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
            disabled={status === Status.Running}
          ></button>
        ))
      )}
    </div>
  );
}

export default Grid;
