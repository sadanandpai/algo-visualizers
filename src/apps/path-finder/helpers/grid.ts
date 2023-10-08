import { ClickType } from '../models/interfaces';

function getRandom(max: number) {
  return Math.floor(Math.random() * max);
}

export function generateGrid(rows: number, cols: number, value = 0) {
  const grid: number[][] = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = value;
    }
  }
  return grid;
}

export function randomMazeGenerator(
  rows: number,
  cols: number,
  {
    wallType,
    entryType,
    exitType,
  }: { wallType: ClickType; entryType: ClickType; exitType: ClickType }
) {
  const grid = generateGrid(rows, cols, 0);

  grid.forEach((row) => {
    row.forEach((_, pos) => {
      if (Math.random() < 0.25) {
        row[pos] = wallType;
      }
    });
  });

  const entry = { row: getRandom(rows), col: getRandom(cols) };
  const exit = { row: -1, col: -1 };
  do {
    exit.row = getRandom(rows);
    exit.col = getRandom(cols);
  } while (exit.row === entry.row && exit.col === entry.col);

  grid[entry.row][entry.col] = entryType;
  grid[exit.row][exit.col] = exitType;
  return { grid, entry, exit };
}
