import { generateGrid } from '../../helpers/grid';
import { CellType, MazeAlgoProps } from '../../models/interfaces';

function getRandomEvenNumber(min: number, max: number) {
  return Math.floor((Math.random() * (max - min + 1)) / 2) * 2 + min;
}

function getRandomOddNumber(min: number, max: number) {
  return Math.floor((Math.random() * (max - min)) / 2) * 2 + 1 + min;
}

function drawHorizontalWall(
  grid: CellType[][],
  {
    divisionPoint,
    passagePoint,
    start,
    end,
  }: {
    divisionPoint: number;
    passagePoint: number;
    start: number;
    end: number;
  }
) {
  for (let pos = start; pos <= end; pos++) {
    grid[divisionPoint][pos] = CellType.wall;
  }
  grid[divisionPoint][passagePoint] = CellType.clear;
}

function drawVerticalWall(
  grid: CellType[][],
  {
    divisionPoint,
    passagePoint,
    start,
    end,
  }: {
    divisionPoint: number;
    passagePoint: number;
    start: number;
    end: number;
  }
) {
  for (let pos = start; pos <= end; pos++) {
    grid[pos][divisionPoint] = CellType.wall;
  }
  grid[passagePoint][divisionPoint] = CellType.clear;
}

export async function generateRecursiveDivisionMaze({
  rows,
  cols,
  entry,
  exit,
  setStateGrid,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.clear);

  recursiveDivision(grid, 0, rows - 1, 0, cols - 1);
  grid[entry.row][entry.col] = CellType.entry;
  grid[exit.row][exit.col] = CellType.exit;

  setStateGrid({ grid });
}

function recursiveDivision(
  grid: CellType[][],
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number
) {
  if (rowEnd - rowStart < 2 || colEnd - colStart < 2) {
    return;
  }

  const width = colEnd - colStart;
  const height = rowEnd - rowStart;
  const isHorizontal = width < height;

  if (isHorizontal) {
    const divisionPoint = getRandomOddNumber(rowStart, rowEnd);
    const passagePoint = getRandomEvenNumber(colStart, colEnd);

    drawHorizontalWall(grid, {
      divisionPoint,
      passagePoint,
      start: colStart,
      end: colEnd,
    });

    recursiveDivision(grid, rowStart, divisionPoint - 1, colStart, colEnd);
    recursiveDivision(grid, divisionPoint + 1, rowEnd, colStart, colEnd);
  } else {
    const divisionPoint = getRandomOddNumber(colStart, colEnd);
    const passagePoint = getRandomEvenNumber(rowStart, rowEnd);

    drawVerticalWall(grid, {
      divisionPoint,
      passagePoint,
      start: rowStart,
      end: rowEnd,
    });

    recursiveDivision(grid, rowStart, rowEnd, colStart, divisionPoint - 1);
    recursiveDivision(grid, rowStart, rowEnd, divisionPoint + 1, colEnd);
  }
}
