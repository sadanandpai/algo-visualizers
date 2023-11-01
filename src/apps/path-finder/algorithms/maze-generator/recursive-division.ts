import { generateGrid } from '../../helpers/grid';

function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function addWall(grid: number[][], x: number, y: number) {
  grid[x][y] = 3;
}

export function generateMazeUsingRecursiveDivision(
  rows: number,
  cols: number,
  cellType = { clear: 0, wall: 3 }
) {
  const grid = generateGrid(rows, cols, cellType.clear);

  recursiveDivision(grid, -1, -1, rows, cols);

  return {
    grid,
    entry: null,
    exit: null,
  };
}

function recursiveDivision(
  grid: number[][],
  rowMin: number,
  colMin: number,
  rowMax: number,
  colMax: number
) {
  if (colMax - colMin > rowMax - rowMin) {
    let x = randomInt(rowMin + 1, rowMax);
    let y = randomInt(colMin + 2, colMax - 1);

    if ((x - rowMin) % 2 === 0) x += randomInt(0, 2) === 0 ? 1 : -1;
    if ((y - colMin) % 2 === 1) y += randomInt(0, 2) === 0 ? 1 : -1;
    for (let i = rowMin + 1; i < rowMax; i++) {
      if (i != x) {
        addWall(grid, i, y);
      }
    }

    if (y - colMin > 2) recursiveDivision(grid, rowMin, colMin, rowMax, y);
    if (colMax - y > 2) recursiveDivision(grid, rowMin, y, rowMax, colMax);
  } else {
    let x = randomInt(rowMin + 2, rowMax - 1);
    let y = randomInt(colMin + 1, colMax);

    if ((x - rowMin) % 2 === 1) x += randomInt(0, 2) === 0 ? 1 : -1;
    if ((y - colMin) % 2 === 0) y += randomInt(0, 2) === 0 ? 1 : -1;
    for (let i = colMin + 1; i < colMax; i++) {
      if (i != y) {
        addWall(grid, x, i);
      }
    }

    if (x - rowMin > 2) recursiveDivision(grid, rowMin, colMin, x, colMax);
    if (rowMax - x > 2) recursiveDivision(grid, x, colMin, rowMax, colMax);
  }
}
