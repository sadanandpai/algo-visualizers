import { generateGrid } from '../../helpers/grid';
import { Cell, CellType } from '../../models/interfaces';

const directions = [
  { row: -2, col: 0 },
  { row: 2, col: 0 },
  { row: 0, col: -2 },
  { row: 0, col: 2 },
];

export function generatePrimsMaze(
  rows: number,
  cols: number,
  entry: Cell,
  exit: Cell
) {
  const grid = generateGrid(rows, cols, CellType.wall);
  const maze = generateGrid(rows, cols, false);
  const neighbors: Cell[] = [];

  function addNeighbors(row: number, col: number) {
    if (row > 1 && !maze[row - 2][col]) {
      neighbors.push({ row: row - 2, col });
    }
    if (row < rows - 2 && !maze[row + 2][col]) {
      neighbors.push({ row: row + 2, col });
    }
    if (col > 1 && !maze[row][col - 2]) {
      neighbors.push({ row, col: col - 2 });
    }
    if (col < cols - 2 && !maze[row][col + 2]) {
      neighbors.push({ row, col: col + 2 });
    }
  }

  function getMazeCells(row: number, col: number) {
    return directions
      .map((direction) => ({
        row: row + direction.row,
        col: col + direction.col,
      }))
      .filter(
        (cell) =>
          cell.row >= 0 && cell.row < rows && cell.col >= 0 && cell.col < cols
      )
      .filter((cell) => maze[cell.row][cell.col]);
  }

  function createPassage(row: number, col: number) {
    const mazeCells = getMazeCells(row, col);
    const passageCell = mazeCells[Math.floor(Math.random() * mazeCells.length)];
    const middleCell = {
      row: row + (passageCell.row - row) / 2,
      col: col + (passageCell.col - col) / 2,
    };

    maze[middleCell.row][middleCell.col] = true;
    grid[row][col] = CellType.clear;
    grid[middleCell.row][middleCell.col] = CellType.clear;
    grid[passageCell.row][passageCell.col] = CellType.clear;
  }

  maze[0][0] = true;
  grid[0][0] = CellType.clear;
  addNeighbors(0, 0);

  while (neighbors.length) {
    const randomIndex = Math.floor(Math.random() * neighbors.length);
    const neighbor = neighbors[randomIndex];
    neighbors.splice(randomIndex, 1);

    if (!maze[neighbor.row][neighbor.col]) {
      maze[neighbor.row][neighbor.col] = true;
      createPassage(neighbor.row, neighbor.col);
      addNeighbors(neighbor.row, neighbor.col);
    }
  }

  grid[entry.row][entry.col] = CellType.entry;
  grid[exit.row][exit.col] = CellType.exit;

  return grid;
}
