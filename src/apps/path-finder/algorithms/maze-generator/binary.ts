import { generateGrid } from '@pathFinder/helpers/grid.helper';
import { Cell, MazeAlgoProps } from '@pathFinder/models';
import { CellType } from '@pathFinder/models/enum';

// Any 2 directions to be considered
const directions = [
  { row: -1, col: 0 },
  { row: 0, col: -1 },
];

export const getNeighbors = (grid: CellType[][], cell: Cell) => {
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

export async function generateBinaryMaze({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.wall);
  updateGrid(grid);

  for (let row = 0; row < rows; row += 2) {
    for (let col = 0; col < cols; col += 2) {
      const cell = { row, col };
      const neighbors = getNeighbors(grid, cell);
      const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

      const cellsToUpdate = neighbor ? [cell, neighbor] : cell;
      await updateCells(grid, cellsToUpdate);
    }
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
