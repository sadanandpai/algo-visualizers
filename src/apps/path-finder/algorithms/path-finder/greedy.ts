import { generateGrid } from '@pathFinder/helpers/grid.helper';
import { SearchAlgoProps, Cell, CellType } from '@pathFinder/models';

interface CostCell extends Cell {
  h: number;
}

function getCostGrid(rows: number, cols: number): CostCell[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({ row, col, h: 0 }))
  );
}

function getManhattanDistance(cell: Cell, exit: Cell) {
  return Math.abs(cell.row - exit.row) + Math.abs(cell.col - exit.col);
}

function getMinimumCostCell(costCells: CostCell[]) {
  let idx = 0;
  let minCostCell = costCells[idx];
  for (let i = 1; i < costCells.length; i++) {
    if (costCells[i].h < minCostCell.h) {
      minCostCell = costCells[i];
      idx = i;
    }
  }

  return { minCostCell, idx };
}

function exploreNeighbors(
  grid: CellType[][],
  costGrid: CostCell[][],
  open: CostCell[],
  closed: Set<CostCell>,
  parents: Cell[][],
  current: CostCell,
  exit: Cell
) {
  const rows = costGrid.length;
  const cols = costGrid[0].length;
  const neighbors = [
    { row: current.row - 1, col: current.col },
    { row: current.row, col: current.col + 1 },
    { row: current.row + 1, col: current.col },
    { row: current.row, col: current.col - 1 },
  ];

  for (const neighbor of neighbors) {
    const { row, col } = neighbor;
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      continue;
    }

    const cellType = grid[row][col];
    const costCell = costGrid[row][col];
    if (
      cellType === CellType.wall ||
      closed.has(costCell) ||
      open.includes(costCell)
    ) {
      continue;
    }

    costCell.h = getManhattanDistance(neighbor, exit);
    parents[row][col] = { row: current.row, col: current.col };
    open.push(costCell);
  }
}

// Greedy best first search algorithm
export async function greedy({
  grid: stateGrid,
  entry,
  exit,
  updateCells,
}: SearchAlgoProps) {
  const grid = stateGrid.map((row) => row.slice());
  const rows = grid.length;
  const cols = grid[0].length;
  const costGrid = getCostGrid(rows, cols);
  const open: CostCell[] = [];
  const closed = new Set([costGrid[entry.row][entry.col]]);
  const parents = generateGrid<Cell>(rows, cols, null);

  exploreNeighbors(
    grid,
    costGrid,
    open,
    closed,
    parents,
    costGrid[entry.row][entry.col],
    exit
  );

  while (open.length > 0) {
    const { minCostCell, idx } = getMinimumCostCell(open);
    if (minCostCell.row === exit.row && minCostCell.col === exit.col) {
      return { grid, parents };
    }

    open.splice(idx, 1);
    closed.add(minCostCell);
    await updateCells(grid, minCostCell, CellType.visited);
    exploreNeighbors(grid, costGrid, open, closed, parents, minCostCell, exit);
  }

  return { grid, parents: null };
}
