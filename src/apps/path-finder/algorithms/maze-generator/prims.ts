import { generateGrid } from '../../helpers/grid';
import { Cell, CellType } from '../../models/interfaces';

export function generateMazeUsingPrims(
  rows: number,
  cols: number,
  entry: Cell,
  exit: Cell
) {
  const grid = generateGrid(rows, cols, CellType.wall);
  const OOB = {};

  const walls: { x: number; y: number }[] = [];
  function makePassage(x: number, y: number) {
    grid[y][x] = CellType.clear;

    const candidates = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];
    for (const wall of candidates) {
      if (lookup(grid, cols, rows, wall.x, wall.y) === CellType.wall) {
        walls.push(wall);
      }
    }
  }

  // Pick random point and make it a passage
  makePassage(0, 0);

  while (walls.length !== 0) {
    const { x, y } = walls.splice((Math.random() * walls.length) | 0, 1)[0];

    const left = lookup(grid, cols, rows, x - 1, y, OOB as number);
    const right = lookup(grid, cols, rows, x + 1, y, OOB as number);
    const top = lookup(grid, cols, rows, x, y - 1, OOB as number);
    const bottom = lookup(grid, cols, rows, x, y + 1, OOB as number);

    if (left === CellType.clear && right === CellType.wall) {
      grid[y][x] = CellType.clear;
      makePassage(x + 1, y);
    } else if (right === CellType.clear && left === CellType.wall) {
      grid[y][x] = CellType.clear;
      makePassage(x - 1, y);
    } else if (top === CellType.clear && bottom === CellType.wall) {
      grid[y][x] = CellType.clear;
      makePassage(x, y + 1);
    } else if (bottom === CellType.clear && top === CellType.wall) {
      grid[y][x] = CellType.clear;
      makePassage(x, y - 1);
    }
  }

  grid[entry.row][entry.col] = CellType.entry;
  grid[exit.row][exit.col] = CellType.exit;

  return {
    grid,
  };
}

function lookup(
  grid: number[][],
  rows: number,
  cols: number,
  row: number,
  col: number,
  defaultValue = 0
) {
  if (row < 0 || col < 0 || row >= rows || col >= cols) {
    return defaultValue;
  }
  return grid[col][row];
}
