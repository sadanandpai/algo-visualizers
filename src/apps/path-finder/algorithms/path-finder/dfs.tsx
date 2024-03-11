import { SearchAlgoProps, Cell, CellType } from '../../models/interfaces';
import { generateGrid } from '../../helpers/grid';

// The Depth First Search Algorithm
export async function startDFSAlgo({
  grid: stateGrid,
  entry,
  exit,
  updateCells,
}: SearchAlgoProps) {
  async function explorePath(
    row: number,
    col: number,
    parentRow = -1,
    parentCol = -1
  ): Promise<boolean> {
    if (row < 0 || col < 0 || row >= rows || col >= cols) {
      return false;
    }

    if (visited[row][col] || grid[row][col] === CellType.wall) {
      return false;
    }

    visited[row][col] = true;
    parents[row][col] = { row: parentRow, col: parentCol };

    if (row === exit.row && col === exit.col) {
      return true;
    }

    if (parentCol !== -1 && parentRow !== -1) {
      await updateCells(grid, { row, col }, CellType.fill);
    }

    return (
      (await explorePath(row + 1, col, row, col)) ||
      (await explorePath(row - 1, col, row, col)) ||
      (await explorePath(row, col + 1, row, col)) ||
      (await explorePath(row, col - 1, row, col))
    );
  }

  const grid = stateGrid.map((row) => row.slice());
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = generateGrid(rows, cols, false); // initalize visited arrays
  const parents = generateGrid<Cell>(rows, cols, null); // initalize parents arrays
  const hasPath = await explorePath(entry.row, entry.col);

  return hasPath ? { grid, parents } : { grid, parents: null };
}
