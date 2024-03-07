import { Cell } from '../../models/interfaces';
import { delay } from '@/lib/helpers/async';
import { generateGrid } from '../../helpers/grid';

// The Depth First Search Algorithm
export async function startDFSAlgo(
  grid: number[][],
  entry: Cell,
  exit: Cell,
  setCell: (value: Cell) => void,
  getIsTriggered: () => boolean,
  delayDuration: number
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = generateGrid(rows, cols, false); // initalize visited arrays
  const parents = generateGrid<Cell>(rows, cols, null); // initalize parents arrays

  async function explorePath(
    row: number,
    col: number,
    coveredCells: Cell[],
    parentRow = -1,
    parentCol = -1
  ): Promise<boolean> {
    if (!getIsTriggered()) {
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
      if (delayDuration > 0) {
        setCell({ row, col });
      } else {
        coveredCells.push({ row: row, col: col });
      }
    }

    if (delayDuration > 0) {
      await delay(delayDuration);
    }

    return (
      (await explorePath(row + 1, col, coveredCells, row, col)) ||
      (await explorePath(row - 1, col, coveredCells, row, col)) ||
      (await explorePath(row, col + 1, coveredCells, row, col)) ||
      (await explorePath(row, col - 1, coveredCells, row, col))
    );
  }

  const coveredCells: Cell[] = [];
  const hasPath = await explorePath(entry.row, entry.col, coveredCells);

  if (coveredCells.length) {
    for (let i = 0; i < coveredCells.length; i++) {
      setCell(coveredCells[i]); // instead use setgrid
    }
  }

  return hasPath ? parents : null;
}
