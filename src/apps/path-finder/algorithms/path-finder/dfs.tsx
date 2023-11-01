import { Cell } from '../../models/interfaces';
import { delay } from '@/lib/helpers/async';
import { generateGrid } from '../../helpers/grid';

// The Depth First Search Algorithm
export async function startDFSAlgo(
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

  async function explorePath(
    row: number,
    col: number,
    parentRow = -1,
    parentCol = -1
  ): Promise<boolean> {
    if (!getIsPlaying()) {
      return false;
    }

    if (row < 0 || col < 0 || row >= rows || col >= cols) {
      return false;
    }

    if (visited[row][col] || grid[row][col] === 3) {
      return false;
    }

    visited[row][col] = true;
    parents[row][col] = { row: parentRow, col: parentCol };

    if (row === exit.row && col === exit.col) {
      return true;
    }

    if (parentCol !== -1 && parentRow !== -1) {
      setGrid({ row, col });
    }

    await delay(25);

    return (
      (await explorePath(row + 1, col, row, col)) ||
      (await explorePath(row - 1, col, row, col)) ||
      (await explorePath(row, col + 1, row, col)) ||
      (await explorePath(row, col - 1, row, col))
    );
  }

  const hasPath = await explorePath(entry.row, entry.col);
  return hasPath ? parents : null;
}
