import { Cell } from '@pathFinder/models/interfaces';
import { delay } from '@/lib/helpers/async';

export async function tracePath(
  parents: Cell[][],
  entry: Cell,
  exit: Cell,
  setCell: (value: Cell) => void,
  isRunning: () => boolean,
  delayDuration: number
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
    setCell({ row, col });
    if (delayDuration > 0) {
      await delay(delayDuration);
    }
    [row, col] = [parents[row][col].row, parents[row][col].col]; // set parents for next iteration
    pathLength += 1;
  } while (isRunning() && (entry.row !== row || entry.col !== col)); // check if entry is reached

  return pathLength;
}
