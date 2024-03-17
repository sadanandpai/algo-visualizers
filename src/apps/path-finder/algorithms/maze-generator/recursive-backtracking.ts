import { generateGrid } from '@pathFinder/helpers/grid';
import { Cell, CellType, MazeAlgoProps } from '@pathFinder/models/interfaces';

const directions = [
  { row: -2, col: 0 },
  { row: 2, col: 0 },
  { row: 0, col: -2 },
  { row: 0, col: 2 },
];

function getNeighbors(
  grid: CellType[][],
  { row, col }: Cell,
  cellType = CellType.clear
) {
  const rows = grid.length;
  const cols = grid[0].length;

  return directions
    .map((direction) => ({
      row: row + direction.row,
      col: col + direction.col,
    }))
    .filter(
      (cell) =>
        cell.row >= 0 && cell.row < rows && cell.col >= 0 && cell.col < cols
    )
    .filter((cell) => grid[cell.row][cell.col] === cellType);
}

async function createPassage(
  grid: CellType[][],
  updateCells: MazeAlgoProps['updateCells'],
  cell: Cell,
  { row, col }: Cell
) {
  const middleCell = {
    row: row + (cell.row - row) / 2,
    col: col + (cell.col - col) / 2,
  };

  await updateCells(grid, [middleCell, { row, col }]);
}

export async function generateRecursiveBacktrackingMaze({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.wall);
  updateGrid(grid);
  updateCells(grid, { row: 0, col: 0 });

  async function recursiveBacktracking(cell: Cell) {
    const neighbors = getNeighbors(grid, cell, CellType.wall);
    while (neighbors.length) {
      const randomIndex = Math.floor(Math.random() * neighbors.length);
      const neighbor = neighbors[randomIndex];
      neighbors.splice(randomIndex, 1);

      if (grid[neighbor.row][neighbor.col] !== CellType.clear) {
        await createPassage(grid, updateCells, cell, neighbor);
        await recursiveBacktracking(neighbor);
      }
    }
  }

  await recursiveBacktracking({ row: 0, col: 0 });

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
