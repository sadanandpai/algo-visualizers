import { SearchAlgoProps, Cell, CellType } from '@pathFinder/models';
import { generateGrid } from '@pathFinder/helpers/grid.helper';

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

// The Breadth First Search Algorithm
export async function breadthFirstSearch({
  grid: stateGrid,
  entry,
  exit,
  updateCells,
}: SearchAlgoProps) {
  const grid = stateGrid.map((row) => row.slice());
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
      const value = queue.shift() as Cell;

      if (value.row === exit.row && value.col === exit.col) {
        // if exit is found, stop searching
        return { grid, parents };
      }

      // Validate and add next coordinates to the queue (All 4 directions i.e up, down, left, right)
      addToQueueIfAllowed(value.row, value.col, value.row - 1, value.col);
      addToQueueIfAllowed(value.row, value.col, value.row, value.col - 1);
      addToQueueIfAllowed(value.row, value.col, value.row + 1, value.col);
      addToQueueIfAllowed(value.row, value.col, value.row, value.col + 1);

      // push the processed coordinate to queue for marking
      loopQueue.push({ row: value.row, col: value.col });
    }

    // mark all the cells which are covered
    for (const value of loopQueue) {
      if (
        !visited[value.row][value.col] &&
        grid[value.row][value.col] !== CellType.wall
      ) {
        visited[value.row][value.col] = true;
        parents[value.row][value.col] = { row: value.row, col: value.col };
        queue.push(value);
      }

      if (grid[value.row][value.col] === CellType.clear) {
        await updateCells(grid, value, CellType.visited);
      }
    }
  }

  return { grid, parents: null };
}
