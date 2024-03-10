import { generateGrid } from '../../helpers/grid';
import { Cell, CellType, MazeAlgoProps } from '../../models/interfaces';

const directions = [
  { row: -2, col: 0 },
  { row: 2, col: 0 },
  { row: 0, col: -2 },
  { row: 0, col: 2 },
];

export async function generateRecursiveBacktrackingMaze({
  rows,
  cols,
  entry,
  exit,
  setStateGrid,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.wall);

  grid[0][0] = CellType.clear;
  recursiveBacktracking(grid, 0, 0, rows, cols);

  grid[entry.row][entry.col] = CellType.entry;
  grid[exit.row][exit.col] = CellType.exit;

  setStateGrid({ grid });
}

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

function createPassage(grid: CellType[][], cell: Cell, neighbor: Cell) {
  const middleCell = {
    row: neighbor.row + (cell.row - neighbor.row) / 2,
    col: neighbor.col + (cell.col - neighbor.col) / 2,
  };

  grid[neighbor.row][neighbor.col] = CellType.clear;
  grid[middleCell.row][middleCell.col] = CellType.clear;
}

function recursiveBacktracking(
  grid: CellType[][],
  row: number,
  col: number,
  rows: number,
  cols: number
) {
  const neighbors = getNonMazeNeighbors(grid, row, col);
  while (neighbors.length) {
    const randomIndex = Math.floor(Math.random() * neighbors.length);
    const neighbor = neighbors[randomIndex];
    neighbors.splice(randomIndex, 1);

    if (grid[neighbor.row][neighbor.col] !== CellType.clear) {
      createPassage(grid, { row, col }, neighbor);
      recursiveBacktracking(grid, neighbor.row, neighbor.col, rows, cols);
    }
  }
}
