import { cellSize } from '@pathFinder/config';
import { CellType } from '@pathFinder/models';

function getRandom(max: number) {
  return Math.floor(Math.random() * max);
}

export function generateGrid<T>(
  rows: number,
  cols: number,
  value: T | null = null
): T[][] {
  return Array.from(new Array(rows), () => new Array(cols).fill(value));
}

export function initGrid(rows: number, cols: number) {
  const grid = generateGrid(rows, cols, 0);
  grid[0][0] = CellType.entry;
  grid[rows - 1][cols - 1] = CellType.exit;
  return grid;
}

export function getEntryAndExit(
  grid: number[][],
  rows: number,
  cols: number,
  cellType: {
    clear: number;
    entry: number;
    exit: number;
    wall: number;
  }
) {
  let entry = { row: -1, col: -1 };
  let exit = { row: -1, col: -1 };

  do {
    entry = { row: getRandom(rows), col: getRandom(cols) };
  } while (grid[entry.row][entry.col] !== cellType.clear);

  do {
    exit = { row: getRandom(rows), col: getRandom(cols) };
  } while (grid[exit.row][exit.col] !== cellType.clear);

  return { entry, exit };
}

export function getDimensionsFromScreenSize() {
  let maxRows = Math.floor(
    (window.innerHeight - 120 - 2 * cellSize) / cellSize
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
