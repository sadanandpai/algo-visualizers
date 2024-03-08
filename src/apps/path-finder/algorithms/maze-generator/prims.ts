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
  const neighbors: Cell[] = [];

  function addNeighbors(row: number, col: number) {
    if (row > 1 && grid[row - 2][col] !== CellType.clear) {
      neighbors.push({ row: row - 2, col });
    }
    if (row < rows - 2 && grid[row + 2][col] !== CellType.clear) {
      neighbors.push({ row: row + 2, col });
    }
    if (col > 1 && grid[row][col - 2] !== CellType.clear) {
      neighbors.push({ row, col: col - 2 });
    }
    if (col < cols - 2 && grid[row][col + 2] !== CellType.clear) {
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
      .filter((cell) => grid[cell.row][cell.col] === CellType.clear);
  }

  function createPassage(row: number, col: number) {
    const mazeCells = getMazeCells(row, col);
    const passageCell = mazeCells[Math.floor(Math.random() * mazeCells.length)];
    const middleCell = {
      row: row + (passageCell.row - row) / 2,
      col: col + (passageCell.col - col) / 2,
    };

    grid[row][col] = CellType.clear;
    grid[middleCell.row][middleCell.col] = CellType.clear;
  }

  grid[0][0] = CellType.clear;
  addNeighbors(0, 0);

  while (neighbors.length) {
    const randomIndex = Math.floor(Math.random() * neighbors.length);
    const neighbor = neighbors[randomIndex];
    neighbors.splice(randomIndex, 1);

    if (grid[neighbor.row][neighbor.col] !== CellType.clear) {
      createPassage(neighbor.row, neighbor.col);
      addNeighbors(neighbor.row, neighbor.col);
    }
  }

  grid[entry.row][entry.col] = CellType.entry;
  grid[exit.row][exit.col] = CellType.exit;

  return grid;
}
