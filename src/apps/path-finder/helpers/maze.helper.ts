import { Cell, CellType } from '@pathFinder/models';

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const directionData = [
  { row: -2, col: 0, direction: Direction.Up },
  { row: 2, col: 0, direction: Direction.Down },
  { row: 0, col: -2, direction: Direction.Left },
  { row: 0, col: 2, direction: Direction.Right },
];

export function getNeighbors({ row, col }: Cell) {
  return directionData.map((direction) => ({
    row: row + direction.row,
    col: col + direction.col,
  }));
}

export function getNeighborsWithDirections({ row, col }: Cell) {
  return directionData.map((direction) => ({
    row: row + direction.row,
    col: col + direction.col,
    direction: direction.direction,
  }));
}

export function filterValidCells<T extends Cell>(
  cells: T[],
  rows: number,
  cols: number
) {
  return cells.filter(
    (cell) =>
      cell.row >= 0 && cell.row < rows && cell.col >= 0 && cell.col < cols
  );
}

export function filterByCellType(
  cells: Cell[],
  grid: CellType[][],
  cellType: CellType
) {
  return cells.filter((cell) => grid[cell.row][cell.col] === cellType);
}

export function getValidTypeNeighbors(
  grid: CellType[][],
  cell: Cell,
  cellType = CellType.clear
) {
  const rows = grid.length;
  const cols = grid[0].length;

  const neighbors = getNeighbors(cell);
  const validNeighbors = filterValidCells(neighbors, rows, cols);
  return filterByCellType(validNeighbors, grid, cellType);
}

export function getRandomIndexFromArray<T>(items: T[]) {
  if (items.length === 0) {
    throw new Error('Array is empty');
  }

  const idx = Math.floor(Math.random() * items.length);
  return { idx, value: items[idx] };
}

export function removeItemFromArray<T>(items: T[], index: number) {
  if (items.length === 0 && index < 0 && index >= items.length) {
    throw new Error('Invalid index');
  }

  if (index === items.length - 1) {
    return items.pop() as T;
  }

  const value = items[index];
  items[index] = items.pop() as T;
  return value;
}

export function spliceRandomIndexFromArray<T>(items: T[]) {
  const { idx } = getRandomIndexFromArray(items);
  return removeItemFromArray<T>(items, idx);
}

export function getRandomEvenNumber(min: number, max: number) {
  const random = Math.floor(Math.random() * (max - min)) + min;
  return random % 2 === 0 ? random : random + 1;
}

export function getRandomOddNumber(min: number, max: number) {
  const random = Math.floor(Math.random() * (max - min)) + min;
  return random % 2 === 1 ? random : random + 1;
}
