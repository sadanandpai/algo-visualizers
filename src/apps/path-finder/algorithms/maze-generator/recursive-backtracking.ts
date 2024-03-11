import { generateGrid } from '../../helpers/grid';
import { Cell, CellType, MazeAlgoProps } from '../../models/interfaces';

const directions = [
  { row: -2, col: 0 },
  { row: 2, col: 0 },
  { row: 0, col: -2 },
  { row: 0, col: 2 },
];

function getNonMazeNeighbors(grid: CellType[][], row: number, col: number) {
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
    .filter((cell) => grid[cell.row][cell.col] !== CellType.clear);
}

async function createPassage(
  grid: CellType[][],
  updateCells: MazeAlgoProps['updateCells'],
  cell: Cell,
  neighbor: Cell
) {
  const middleCell = {
    row: neighbor.row + (cell.row - neighbor.row) / 2,
    col: neighbor.col + (cell.col - neighbor.col) / 2,
  };

  await updateCells(grid, [middleCell, neighbor], CellType.clear);
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

  async function recursiveBacktracking(row: number, col: number) {
    const neighbors = getNonMazeNeighbors(grid, row, col);
    while (neighbors.length) {
      const randomIndex = Math.floor(Math.random() * neighbors.length);
      const neighbor = neighbors[randomIndex];
      neighbors.splice(randomIndex, 1);

      if (grid[neighbor.row][neighbor.col] !== CellType.clear) {
        await createPassage(grid, updateCells, { row, col }, neighbor);
        await recursiveBacktracking(neighbor.row, neighbor.col);
      }
    }
  }

  await recursiveBacktracking(0, 0);

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
