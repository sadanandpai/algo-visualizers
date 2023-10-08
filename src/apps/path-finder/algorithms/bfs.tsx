function generateGrid(rows: number, cols: number, value: unknown) {
  return Array.from(new Array(rows), () => new Array(cols).fill(value));
}

// function setGridCell(grid: number[][], setGrid: any, x, y, value) {
//   const newGrid = [...grid]; // though its an array of array, shallow copy should work fine
//   newGrid[x][y] = value; // set the value to the specific cell
//   setGrid(newGrid);
// }

// function setGridCells(grid, setGrid, positions, value, entry) {
//   const newGrid = [...grid];
//   positions.forEach((position) => {
//     if (!(position.x === entry.x && position.y === entry.y)) {
//       // check if position is not same as entry
//       newGrid[position.x][position.y] = value; // set value of cell
//     }
//   });
//   setGrid(newGrid);
// }

function getAddToQueueIfAllowedFunction(
  grid: number[][],
  parents: { row: number; col: number }[][],
  visited: boolean[][],
  queue: { row: number; col: number }[]
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

// async function tracePath(entry, exit, parents, grid, setGrid, isInProgress) {
//   let x = exit.x;
//   let y = exit.y;
//   [x, y] = [parents[x][y].x, parents[x][y].y];

//   let pathLength = 0;
//   // if entry and exit are next to each other
//   if (entry.x === x && entry.y === y) {
//     return pathLength;
//   }

//   // Start marking the path with a small delay
//   do {
//     setGridCell(grid, setGrid, x, y, pathType);
//     await delay(100);
//     [x, y] = [parents[x][y].x, parents[x][y].y]; // set parents for next iteration
//     pathLength += 1;
//   } while (isInProgress.current && (entry.x !== x || entry.y !== y)); // check if entry is reached

//   return pathLength;
// }

// The Breadth First Search Algorithm (Use different alogirthm if needed)
export async function startBFSAlgo(
  grid: number[][],
  entry: { row: number; col: number },
  exit: { row: number; col: number },
  setGrid: any,
  isInProgress: boolean
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = generateGrid(rows, cols, false); // initalize visited arrays
  const parents = generateGrid(rows, cols, -1); // initalize parents arrays

  const queue = [entry]; // Add entry coordinate to the queue
  visited[entry.row][entry.col] = true; // mark it as visited

  // get the function for reuse with coordinates
  const addToQueueIfAllowed = getAddToQueueIfAllowedFunction(
    grid,
    parents,
    visited,
    queue
  );

  let isPathFound = false;
  outerLoop: while (queue.length) {
    // iterate till queue items are over
    const length = queue.length;

    const loopQueue = []; // loopQueue is used for marking the coordinates after each inner iteration
    for (let k = 0; k < length; k++) {
      const value = queue.shift()!;

      if (value.row === exit.row && value.col === exit.col) {
        // if exit is found, stop searching
        isPathFound = true;
        break outerLoop;
      }

      if (!isInProgress) {
        break outerLoop;
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

  // if (isPathFound && isInProgress.current) {
  //   // trace the path only if present
  //   // toast.success("Path found!!! 😃");
  //   const pathLength = await tracePath(
  //     entry,
  //     exit,
  //     parents,
  //     grid,
  //     setGrid,
  //     isInProgress
  //   );

  //   if (isInProgress.current) {
  //     // toast("Shortest path length is " + (pathLength + 1));
  //   }
  //   return;
  // }

  // if no path found
  // if (isInProgress.current) {
  //   // toast.warning("No path found!!! 😟");
  //   return;
  // }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
