import { generateGrid } from '../../helpers/grid';
import { Cell, CellType, MazeAlgoProps } from '../../models/interfaces';

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

interface CellWithDirection extends Cell {
  direction: Direction;
}

function getRandomNonMazeCell(
  grid: CellType[][],
  eligibleCellsCount: number,
  inMazeCellsCount: number
) {
  const randomCount = Math.floor(
    Math.random() * (eligibleCellsCount - inMazeCellsCount)
  );

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  for (let row = 0; row < rows; row += 2) {
    for (let col = 0; col < cols; col += 2) {
      if (grid[row][col] === CellType.wall) {
        if (count === randomCount) {
          return { row, col };
        }
        count++;
      }
    }
  }

  return null;
}

function getRandomNeighbor(grid: CellType[][], currentCell: Cell) {
  const rows = grid.length;
  const cols = grid[0].length;
  const neighbors: CellWithDirection[] = [];
  if (currentCell.row > 1) {
    neighbors.push({
      row: currentCell.row - 2,
      col: currentCell.col,
      direction: Direction.Up,
    });
  }
  if (currentCell.row < rows - 2) {
    neighbors.push({
      row: currentCell.row + 2,
      col: currentCell.col,
      direction: Direction.Down,
    });
  }
  if (currentCell.col > 1) {
    neighbors.push({
      row: currentCell.row,
      col: currentCell.col - 2,
      direction: Direction.Left,
    });
  }
  if (currentCell.col < cols - 2) {
    neighbors.push({
      row: currentCell.row,
      col: currentCell.col + 2,
      direction: Direction.Right,
    });
  }

  return neighbors[Math.floor(Math.random() * neighbors.length)];
}

function startRandomWalk(
  grid: CellType[][],
  directions: Direction[][],
  startCell: Cell
) {
  let currentCell = startCell;

  while (grid[currentCell.row][currentCell.col] === CellType.wall) {
    const randomNeighbor = getRandomNeighbor(grid, currentCell);
    directions[currentCell.row][currentCell.col] = randomNeighbor.direction;
    currentCell = randomNeighbor;
  }
}

function getTravelledPath(
  grid: CellType[][],
  directions: Direction[][],
  startCell: Cell
) {
  const travelledPath: Cell[] = [];
  let currentCell = startCell;
  let visitedCount = 0;

  travelledPath.push(currentCell);
  do {
    const { row, col } = currentCell;
    const direction = directions[row][col];
    visitedCount++;

    switch (direction) {
      case Direction.Up:
        currentCell = { row: row - 2, col };
        travelledPath.push({ row: row - 1, col });
        break;
      case Direction.Down:
        travelledPath.push({ row: row + 1, col });
        currentCell = { row: row + 2, col };
        break;
      case Direction.Left:
        travelledPath.push({ row, col: col - 1 });
        currentCell = { row, col: col - 2 };
        break;
      case Direction.Right:
        travelledPath.push({ row, col: col + 1 });
        currentCell = { row, col: col + 2 };
        break;
    }

    travelledPath.push(currentCell);
  } while (grid[currentCell.row][currentCell.col] !== CellType.clear);

  return { travelledPath, visitedCount };
}

export async function generateWilsonMaze({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.wall);
  updateGrid(grid);

  const directions: Direction[][] = generateGrid<Direction>(rows, cols, null);
  const eligibleCellsCount = Math.ceil(rows / 2) * Math.ceil(cols / 2);

  let inMazeCellsCount = 0;
  const randomMazeCell = getRandomNonMazeCell(
    grid,
    eligibleCellsCount,
    inMazeCellsCount
  );
  if (!randomMazeCell) {
    return grid;
  }
  inMazeCellsCount++;
  await updateCells(grid, randomMazeCell);

  let randomStartCell = getRandomNonMazeCell(
    grid,
    eligibleCellsCount,
    inMazeCellsCount
  );

  while (randomStartCell) {
    startRandomWalk(grid, directions, randomStartCell);
    const { travelledPath, visitedCount } = getTravelledPath(
      grid,
      directions,
      randomStartCell
    );

    for (const cell of travelledPath) {
      await updateCells(grid, cell);
    }
    inMazeCellsCount += visitedCount;

    randomStartCell = getRandomNonMazeCell(
      grid,
      eligibleCellsCount,
      inMazeCellsCount
    );
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
