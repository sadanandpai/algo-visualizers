import { delay } from '@/lib/helpers/async';
import { generateGrid } from '../../helpers/grid';
import { Cell, CellType, MazeAlgoProps } from '../../models/interfaces';

const directions = [
  { row: -2, col: 0 },
  { row: 2, col: 0 },
  { row: 0, col: -2 },
  { row: 0, col: 2 },
];

function getSetCell(
  setStateCells: (cells: Cell[], cellType: CellType) => void,
  grid: CellType[][],
  delayDuration = 0
) {
  return async function (cells: Cell[], cellType = CellType.clear) {
    cells.forEach((cell) => {
      grid[cell.row][cell.col] = cellType;
    });

    if (delayDuration) {
      setStateCells(cells, cellType);
      await delay(delayDuration);
    }
  };
}

function getNonMazeNeighbors(grid: CellType[][], { row, col }: Cell) {
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

function getMazeCells(grid: CellType[][], { row, col }: Cell) {
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
    .filter((cell) => grid[cell.row][cell.col] === CellType.clear);
}

function createPassage(grid: CellType[][], cell: Cell) {
  const mazeCells = getMazeCells(grid, cell);
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
  setStateCells,
  setStateGrid,
  delayDuration,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.wall);
  if (delayDuration) {
    setStateGrid({ grid, clone: true });
  }
  const setCells = getSetCell(setStateCells, grid, delayDuration);
  const neighbors: Cell[] = [];
  const startCell = { row: 0, col: 0 };
  setCells([startCell]);
  neighbors.push(...getNonMazeNeighbors(grid, startCell));

  while (neighbors.length) {
    const randomIndex = Math.floor(Math.random() * neighbors.length);
    const neighbor = neighbors[randomIndex];
    neighbors.splice(randomIndex, 1);

    if (grid[neighbor.row][neighbor.col] !== CellType.clear) {
      const middleCell = createPassage(grid, neighbor);
      await setCells([{ row: middleCell.row, col: middleCell.col }, neighbor]);
      neighbors.push(...getNonMazeNeighbors(grid, neighbor));
    }
  }

  setCells([entry], CellType.entry);
  setCells([exit], CellType.exit);

  if (!delayDuration) {
    setStateGrid({ grid });
  }
}
