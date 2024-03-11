import { generateGrid } from '../../helpers/grid';
import { CellType, MazeAlgoProps } from '../../models/interfaces';

interface DrawWallConfig {
  updateCells: MazeAlgoProps['updateCells'];
  divisionPoint: number;
  passagePoint: number;
  start: number;
  end: number;
}

function getRandomEvenNumber(min: number, max: number) {
  return Math.floor((Math.random() * (max - min + 1)) / 2) * 2 + min;
}

function getRandomOddNumber(min: number, max: number) {
  return Math.floor((Math.random() * (max - min)) / 2) * 2 + 1 + min;
}

async function drawHorizontalWall(
  grid: CellType[][],
  { updateCells, divisionPoint, passagePoint, start, end }: DrawWallConfig
) {
  for (let pos = start; pos <= end; pos++) {
    await updateCells(grid, [{ row: divisionPoint, col: pos }], CellType.wall);
  }
  await updateCells(grid, [{ row: divisionPoint, col: passagePoint }]);
}

async function drawVerticalWall(
  grid: CellType[][],
  { updateCells, divisionPoint, passagePoint, start, end }: DrawWallConfig
) {
  for (let pos = start; pos <= end; pos++) {
    await updateCells(grid, [{ row: pos, col: divisionPoint }], CellType.wall);
  }
  await updateCells(grid, [{ row: passagePoint, col: divisionPoint }]);
}

export async function generateRecursiveDivisionMaze({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.clear);
  updateGrid(grid);

  async function recursiveDivision(
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

      await drawHorizontalWall(grid, {
        updateCells,
        divisionPoint,
        passagePoint,
        start: colStart,
        end: colEnd,
      });

      await recursiveDivision(rowStart, divisionPoint - 1, colStart, colEnd);
      await recursiveDivision(divisionPoint + 1, rowEnd, colStart, colEnd);
    } else {
      const divisionPoint = getRandomOddNumber(colStart, colEnd);
      const passagePoint = getRandomEvenNumber(rowStart, rowEnd);

      await drawVerticalWall(grid, {
        updateCells,
        divisionPoint,
        passagePoint,
        start: rowStart,
        end: rowEnd,
      });

      await recursiveDivision(rowStart, rowEnd, colStart, divisionPoint - 1);
      await recursiveDivision(rowStart, rowEnd, divisionPoint + 1, colEnd);
    }
  }

  await recursiveDivision(0, rows - 1, 0, cols - 1);
  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);

  return grid;
}
