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

export function getDimensionsFromScrenSize() {
  const size = 25;
  let maxRows = Math.floor((window.innerHeight - 140 - 2 * size) / size);
  let maxCols = Math.floor((window.innerWidth - 3 * size) / size);

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
