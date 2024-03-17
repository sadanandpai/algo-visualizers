import { generateGrid } from '@pathFinder/helpers/grid';
import { Cell, CellType, MazeAlgoProps } from '@pathFinder/models/interfaces';

const directions = [
  { row: -2, col: 0 },
  { row: 2, col: 0 },
  { row: 0, col: -2 },
  { row: 0, col: 2 },
];

export function getNeighbors(
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

export function createPassage(grid: CellType[][], cell: Cell) {
  const mazeCells = getNeighbors(grid, cell);
  const passageCell = mazeCells[Math.floor(Math.random() * mazeCells.length)];
  const middleCell = {
    row: cell.row + (passageCell.row - cell.row) / 2,
    col: cell.col + (passageCell.col - cell.col) / 2,
  };
  return middleCell;
}

export async function generatePrimsMaze({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.wall);
  updateGrid(grid);

  const neighbors: Cell[] = [];
  const startCell = { row: 0, col: 0 };
  updateCells(grid, startCell);

  neighbors.push(...getNeighbors(grid, startCell, CellType.wall));
  while (neighbors.length) {
    const randomIndex = Math.floor(Math.random() * neighbors.length);
    const neighbor = neighbors[randomIndex];
    neighbors.splice(randomIndex, 1);

    if (grid[neighbor.row][neighbor.col] !== CellType.clear) {
      const middleCell = createPassage(grid, neighbor);
      await updateCells(grid, [middleCell, neighbor]);
      neighbors.push(...getNeighbors(grid, neighbor, CellType.wall));
    }
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
