export function generateMazeUsingPrims(
  grid: number[][],
  cellType = { clear: 0, wall: 3 }
) {
  const height = grid.length;
  const width = grid[0].length;
  const OOB = {};

  const walls: { x: number; y: number }[] = [];
  function makePassage(x: number, y: number) {
    grid[y][x] = cellType.clear;

    const candidates = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];
    for (const wall of candidates) {
      if (lookup(grid, width, height, wall.x, wall.y) === cellType.wall) {
        walls.push(wall);
      }
    }
  }

  // Pick random point and make it a passage
  makePassage((Math.random() * width) | 0, (Math.random() * height) | 0);
  while (walls.length !== 0) {
    const { x, y } = walls.splice((Math.random() * walls.length) | 0, 1)[0];

    const left = lookup(grid, width, height, x - 1, y, OOB);
    const right = lookup(grid, width, height, x + 1, y, OOB);
    const top = lookup(grid, width, height, x, y - 1, OOB);
    const bottom = lookup(grid, width, height, x, y + 1, OOB);

    if (left === cellType.clear && right === cellType.wall) {
      grid[y][x] = cellType.clear;
      makePassage(x + 1, y);
    } else if (right === cellType.clear && left === cellType.wall) {
      grid[y][x] = cellType.clear;
      makePassage(x - 1, y);
    } else if (top === cellType.clear && bottom === cellType.wall) {
      grid[y][x] = cellType.clear;
      makePassage(x, y + 1);
    } else if (bottom === cellType.clear && top === cellType.wall) {
      grid[y][x] = cellType.clear;
      makePassage(x, y - 1);
    }
  }

  return grid;
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
