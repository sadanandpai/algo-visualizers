import { Cell } from '../models/interfaces';
import { delay } from '@/lib/helpers/async';

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
