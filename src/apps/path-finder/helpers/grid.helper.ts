import { CellType } from '@pathFinder/models';
import { cellSize } from '@pathFinder/config';

export function generateGrid<T>(
  rows: number,
  cols: number,
  value: T | null = null,
): T[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => value as T),
  );
}

export function initGrid(rows: number, cols: number) {
  const grid = generateGrid(rows, cols, 0);
  grid[0][0] = CellType.entry;
  grid[rows - 1][cols - 1] = CellType.exit;
  return grid;
}

export function getDimensionsFromScreenSize() {
  let maxRows = Math.floor(
    (window.innerHeight - 120 - 2 * cellSize) / cellSize,
  );
  let maxCols = Math.floor((window.innerWidth - 3 * cellSize) / cellSize);

  if (maxRows % 2 === 0) {
    maxRows -= 1;
  }

  if (maxCols % 2 === 0) {
    maxCols -= 1;
  }

  return {
    maxRows,
    maxCols,
  };
}
