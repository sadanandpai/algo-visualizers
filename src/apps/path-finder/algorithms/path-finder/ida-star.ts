import { generateGrid } from '@pathFinder/helpers/grid.helper';
import { SearchAlgoProps, Cell, CellType } from '@pathFinder/models';

const directions = [
  { row: -1, col: 0 },
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
];

function getManhattanDistance(cell: Cell, exit: Cell) {
  return Math.abs(cell.row - exit.row) + Math.abs(cell.col - exit.col);
}

// Iterative deepening A* search
export async function idaStar({
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

  // Cost bounded depth first search. Returns the smallest estimated cost that
  // exceeded the bound so that the next iteration can pick it up.
  async function search(bound: number) {
    const costs = generateGrid(rows, cols, Infinity);
    let nextBound = Infinity;

    async function explore(cell: Cell, cost: number): Promise<boolean> {
      if (cost >= costs[cell.row][cell.col]) {
        return false;
      }
      costs[cell.row][cell.col] = cost;

      const estimate = cost + getManhattanDistance(cell, exit);
      if (estimate > bound) {
        nextBound = Math.min(nextBound, estimate);
        return false;
      }

      if (cell.row === exit.row && cell.col === exit.col) {
        return true;
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

        if (cost + 1 >= costs[row][col]) {
          continue;
        }

        parents[row][col] = { row: cell.row, col: cell.col };
        if (await explore({ row, col }, cost + 1)) {
          return true;
        }
      }

      return false;
    }

    const found = await explore(entry, 0);
    return { found, nextBound };
  }

  let bound = getManhattanDistance(entry, exit);
  while (bound < rows * cols) {
    const { found, nextBound } = await search(bound);

    if (found) {
      return { grid, parents };
    }

    if (nextBound === Infinity) {
      break;
    }

    bound = nextBound;
  }

  return { grid, parents: null };
}
