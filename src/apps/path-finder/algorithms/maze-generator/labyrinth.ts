import { generateGrid } from '@/apps/path-finder/helpers/grid.helper';
import { CellType, MazeAlgoProps } from '@pathFinder/models/interfaces';

interface Direction {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export function getRandomEvenNumber(min: number, max: number) {
  const random = Math.floor(Math.random() * (max - min)) + min;
  return random % 2 === 0 ? random : random + 1;
}

export function getRandomOddNumber(min: number, max: number) {
  const random = Math.floor(Math.random() * (max - min)) + min;
  return random % 2 === 1 ? random : random + 1;
}

export async function addWalls(
  grid: CellType[][],
  updateCells: MazeAlgoProps['updateCells']
) {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let row = 1; row < rows / 2; row += 2) {
    for (let col = row; col < cols - row; col++) {
      await updateCells(
        grid,
        [
          { row, col },
          { row: rows - row - 1, col },
        ],
        CellType.wall
      );
    }
  }

  for (let col = 1; col < cols / 2; col += 2) {
    for (let row = col; row < rows - col - 1; row++) {
      await updateCells(
        grid,
        [
          { row, col },
          { row, col: cols - col - 1 },
        ],
        CellType.wall
      );
    }
  }
}

export async function addVerticalBlocks(
  grid: CellType[][],
  updateCells: MazeAlgoProps['updateCells'],
  stage: number
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const top = getRandomOddNumber(stage + 2, cols - stage - 3);
  const bottom = getRandomOddNumber(stage + 2, cols - stage - 3);

  await updateCells(
    grid,
    [
      { row: stage, col: top },
      { row: rows - stage - 1, col: bottom },
    ],
    CellType.wall
  );
  return { top, bottom };
}

async function addHorizontalBlocks(
  grid: CellType[][],
  updateCells: MazeAlgoProps['updateCells'],
  stage: number
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const left = getRandomOddNumber(stage + 2, rows - stage - 3);
  const right = getRandomOddNumber(stage + 2, rows - stage - 3);

  await updateCells(
    grid,
    [
      { row: right, col: cols - stage - 1 },
      { row: left, col: stage },
    ],
    CellType.wall
  );
  return { left, right };
}

export async function addGaps(
  grid: CellType[][],
  updateCells: MazeAlgoProps['updateCells'],
  stage: number,
  { top, right, bottom, left }: Direction
) {
  const rows = grid.length;
  const cols = grid[0].length;
  let random;

  // get cells between top and right
  const cells = [];
  for (let i = top + 1; i < cols - stage - 1; i += 2) {
    cells.push({ row: stage + 1, col: i });
  }
  for (let i = stage + 2; i < right; i += 2) {
    cells.push({ row: i, col: cols - stage - 2 });
  }

  random = Math.floor(Math.random() * cells.length);
  await updateCells(grid, cells[random]);

  // get cells between right and bottom
  cells.length = 0;
  for (let i = right + 1; i < rows - stage - 1; i += 2) {
    cells.push({ row: i, col: cols - stage - 2 });
  }
  for (let i = cols - stage - 3; i > bottom; i -= 2) {
    cells.push({ row: rows - stage - 2, col: i });
  }

  random = Math.floor(Math.random() * cells.length);
  await updateCells(grid, cells[random]);

  // get cells between bottom and left
  cells.length = 0;
  for (let i = bottom - 1; i > stage; i -= 2) {
    cells.push({ row: rows - stage - 2, col: i });
  }
  for (let i = rows - stage - 3; i > left; i -= 2) {
    cells.push({ row: i, col: stage + 1 });
  }

  random = Math.floor(Math.random() * cells.length);
  await updateCells(grid, cells[random]);

  // // get cells between left and top
  cells.length = 0;
  for (let i = left - 1; i > stage + 1; i -= 2) {
    cells.push({ row: i, col: stage + 1 });
  }
  for (let i = stage + 2; i < top; i += 2) {
    cells.push({ row: stage + 1, col: i });
  }

  random = Math.floor(Math.random() * cells.length);
  await updateCells(grid, cells[random]);
}

export async function generateLabyrinth({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.clear);
  updateGrid(grid);
  await addWalls(grid, updateCells);

  const maxStage = Math.min(rows, cols) / 2 - 2;
  for (let i = 0; i < maxStage; i += 2) {
    let left = 1,
      right = 1,
      top = 1,
      bottom = 1;
    if (rows - 2 * i > 5) {
      ({ left, right } = await addHorizontalBlocks(grid, updateCells, i));
    }

    if (cols - 2 * i > 5) {
      ({ top, bottom } = await addVerticalBlocks(grid, updateCells, i));
    }

    if (rows - 2 * i > 5 || cols - 2 * i > 5) {
      await addGaps(grid, updateCells, i, { top, right, bottom, left });
    }
    // await addGaps(grid, updateCells, i, { top, right, bottom, left });
  }

  const centerPos = Math.floor(rows / 2);
  if (rows === cols && centerPos % 2 === 0) {
    const centerLoop = [
      { row: centerPos, col: centerPos - 1 },
      { row: centerPos, col: centerPos + 1 },
      { row: centerPos - 1, col: centerPos },
      { row: centerPos + 1, col: centerPos },
    ];

    const random = Math.floor(Math.random() * centerLoop.length);
    await updateCells(grid, centerLoop[random], CellType.clear);
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
