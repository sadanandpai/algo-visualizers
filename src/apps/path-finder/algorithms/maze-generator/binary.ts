import { generateGrid } from '../../helpers/grid';
import { Cell, CellType } from '../../models/interfaces';

// Any 2 directions to be considered
const directions = [
  { row: -1, col: 0 },
  { row: 0, col: -1 },
];

const getNeighbors = (grid: CellType[][], cell: Cell) => {
  const rows = grid.length;
  const cols = grid[0].length;

  return directions
    .map((direction) => ({
      row: cell.row + direction.row,
      col: cell.col + direction.col,
    }))
    .filter(
      (cell) =>
        cell.row >= 0 && cell.row < rows && cell.col >= 0 && cell.col < cols
    );
};

export function generateBinaryMaze(
  rows: number,
  cols: number,
  entry: Cell,
  exit: Cell
) {
  const grid = generateGrid(rows, cols, CellType.wall);

  for (let row = 0; row < rows; row += 2) {
    for (let col = 0; col < cols; col += 2) {
      grid[row][col] = CellType.clear;

      const neighbors = getNeighbors(grid, { row, col });
      const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

      if (neighbor) {
        grid[neighbor.row][neighbor.col] = CellType.clear;
      }
    }
  }

  grid[entry.row][entry.col] = CellType.entry;
  grid[exit.row][exit.col] = CellType.exit;

  return grid;
}
