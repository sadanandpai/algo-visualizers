import { generateGrid } from '@pathFinder/helpers/grid.helper';
import { SearchAlgoProps, Cell, CellType } from '@pathFinder/models';

const directions = [
  { row: 1, col: 0 },
  { row: -1, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: -1 },
];

// Iterative deepening depth first search
export async function iterativeDeepeningSearch({
  grid: stateGrid,
  entry,
  exit,
  updateCells,
}: SearchAlgoProps) {
  const grid = stateGrid.map((row) => row.slice());
  const rows = grid.length;
  const cols = grid[0].length;
  const parents = generateGrid<Cell>(rows, cols, null);
  const reported = generateGrid(rows, cols, false);

  async function visit(cell: Cell) {
    if (reported[cell.row][cell.col]) {
      return;
    }

    reported[cell.row][cell.col] = true;
    if (grid[cell.row][cell.col] === CellType.clear) {
      await updateCells(grid, cell, CellType.visited);
    }
  }

  // Depth limited search. A cell is explored again within the same iteration
  // only when it is reached through a shorter path, which keeps the search
  // complete without blowing up the number of expansions.
  async function search(limit: number) {
    const depths = generateGrid(rows, cols, Infinity);
    let cutOff = false;

    async function explore(cell: Cell, depth: number): Promise<boolean> {
      if (depth >= depths[cell.row][cell.col]) {
        return false;
      }
      depths[cell.row][cell.col] = depth;

      if (cell.row === exit.row && cell.col === exit.col) {
        return true;
      }

      if (depth === limit) {
        cutOff = true;
        return false;
      }

      await visit(cell);

      for (const direction of directions) {
        const row = cell.row + direction.row;
        const col = cell.col + direction.col;

        if (row < 0 || row >= rows || col < 0 || col >= cols) {
          continue;
        }

        if (grid[row][col] === CellType.wall) {
          continue;
        }

        if (depth + 1 >= depths[row][col]) {
          continue;
        }

        parents[row][col] = { row: cell.row, col: cell.col };
        if (await explore({ row, col }, depth + 1)) {
          return true;
        }
      }

      return false;
    }

    const found = await explore(entry, 0);
    return { found, cutOff };
  }

  for (let limit = 0; limit < rows * cols; limit++) {
    const { found, cutOff } = await search(limit);

    if (found) {
      return { grid, parents };
    }

    if (!cutOff) {
      break;
    }
  }

  return { grid, parents: null };
}
