import { PathAlgoProps } from '@pathFinder/models';

export async function tracePath({
  parents,
  entry,
  exit,
  updateCell,
}: PathAlgoProps) {
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
    await updateCell({ row, col });
    [row, col] = [parents[row][col].row, parents[row][col].col]; // set parents for next iteration
    pathLength += 1;
  } while (entry.row !== row || entry.col !== col); // check if entry is reached

  return pathLength;
}
