import { Cell } from '../../models/interfaces';
import { generateGrid } from '../../helpers/grid';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAddToQueueIfAllowedFunction(
  grid: number[][],
  parents: Cell[][],
  visited: boolean[][],
  queue: Cell[]
) {
  const rows = grid.length;
  const cols = grid[0].length;

  return function (row: number, col: number, nextX: number, nextY: number) {
    // check if the next coordinate is within the grid
    if (nextX >= 0 && nextY >= 0 && nextX < rows && nextY < cols) {
      // the next coordinate should neither be visited before nor should be a wall
      if (!visited[nextX][nextY] && grid[nextX][nextY] !== 3) {
        queue.push({ row: nextX, col: nextY }); // push to the queue
        parents[nextX][nextY] = { row, col }; // update its parents
        visited[nextX][nextY] = true; // mark as visited
      }
    }
  };
}

export async function tracePath(
  parents: Cell[][],
  entry: Cell,
  exit: Cell,
  setGrid: (value: Cell) => void,
  getIsPlaying: () => boolean
) {
  let row = exit.row;
  let col = exit.col;
  [row, col] = [parents[row][col].row, parents[row][col].col];

  let pathLength = 0;
  // if entry and exit are next to each other
  if (entry.row === row && entry.col === col) {
    return pathLength;
  }

  // Start marking the path with a small delay
  do {
    setGrid({ row, col });
    await delay(100);
    [row, col] = [parents[row][col].row, parents[row][col].col]; // set parents for next iteration
    pathLength += 1;
  } while (getIsPlaying() && (entry.row !== row || entry.col !== col)); // check if entry is reached

  return pathLength;
}

// The Breadth First Search Algorithm (Use different alogirthm if needed)
export async function startBFSAlgo(
  grid: number[][],
  entry: Cell,
  exit: Cell,
  setGrid: (value: Cell) => void,
  getIsPlaying: () => boolean
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = generateGrid(rows, cols, false); // initalize visited arrays
  const parents = generateGrid<Cell>(rows, cols, null); // initalize parents arrays

  const queue = [entry]; // Add entry coordinate to the queue
  visited[entry.row][entry.col] = true; // mark it as visited

  // get the function for reuse with coordinates
  const addToQueueIfAllowed = getAddToQueueIfAllowedFunction(
    grid,
    parents,
    visited,
    queue
  );

  while (queue.length) {
    // iterate till queue items are over
    const length = queue.length;

    const loopQueue = []; // loopQueue is used for marking the coordinates after each inner iteration
    for (let k = 0; k < length; k++) {
      const value = queue.shift()!;

      if (value.row === exit.row && value.col === exit.col) {
        // if exit is found, stop searching
        return parents;
      }

      if (!getIsPlaying()) {
        return;
      }

      // Validate and add next coordinates to the queue (All 4 directions i.e up, down, left, right)
      addToQueueIfAllowed(value.row, value.col, value.row + 1, value.col);
      addToQueueIfAllowed(value.row, value.col, value.row - 1, value.col);
      addToQueueIfAllowed(value.row, value.col, value.row, value.col + 1);
      addToQueueIfAllowed(value.row, value.col, value.row, value.col - 1);

      // push the processed coordinate to queue for marking
      loopQueue.push({ row: value.row, col: value.col });
    }

    // mark all the cells which are covered
    for (let i = 0; i < loopQueue.length; i++) {
      const value = loopQueue[i];
      if (!visited[value.row][value.col] && grid[value.row][value.col] !== 3) {
        visited[value.row][value.col] = true;
        parents[value.row][value.col] = { row: value.row, col: value.col };
        queue.push(value);
      }
      if (grid[value.row][value.col] === 0) {
        setGrid({ row: value.row, col: value.col });
      }
    }
    await delay(200);
  }

  return null;
}
