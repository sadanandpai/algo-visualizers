import { generateGrid } from '@pathFinder/helpers/grid.helper';
import { CellType, MazeAlgoProps } from '@pathFinder/models';
import { getRandomOddNumber } from '@pathFinder/helpers/maze.helper';

interface Direction {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export async function addStages(
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

export async function addHorizontalBlocks(
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

export function getTopRightCells({
  cols,
  stage,
  top,
  right,
}: {
  cols: number;
  stage: number;
  top: number;
  right: number;
}) {
  const cells = [];
  if (top !== 0) {
    for (let i = top + 1; i < cols - stage - 1; i += 2) {
      cells.push({ row: stage + 1, col: i });
    }
  }
  if (right !== 0) {
    for (let i = stage + 2; i < right; i += 2) {
      cells.push({ row: i, col: cols - stage - 2 });
    }
  }

  return cells;
}

export function getRightBottomCells({
  rows,
  cols,
  stage,
  right,
  bottom,
}: {
  rows: number;
  cols: number;
  stage: number;
  right: number;
  bottom: number;
}) {
  const cells = [];
  if (right !== 0) {
    for (let i = right + 1; i < rows - stage - 1; i += 2) {
      cells.push({ row: i, col: cols - stage - 2 });
    }
  }
  if (bottom !== 0) {
    for (let i = cols - stage - 3; i > bottom; i -= 2) {
      cells.push({ row: rows - stage - 2, col: i });
    }
  }
  return cells;
}

export function getBottomLeftCells({
  rows,
  stage,
  bottom,
  left,
}: {
  rows: number;
  stage: number;
  bottom: number;
  left: number;
}) {
  const cells = [];
  if (bottom !== 0) {
    for (let i = bottom - 1; i > stage; i -= 2) {
      cells.push({ row: rows - stage - 2, col: i });
    }
  }
  if (left !== 0) {
    for (let i = rows - stage - 3; i > left; i -= 2) {
      cells.push({ row: i, col: stage + 1 });
    }
  }
  return cells;
}

export function getLeftTopCells({
  stage,
  top,
  left,
}: {
  stage: number;
  top: number;
  left: number;
}) {
  const cells = [];
  if (left !== 0) {
    for (let i = left - 1; i > stage + 1; i -= 2) {
      cells.push({ row: i, col: stage + 1 });
    }
  }
  if (top !== 0) {
    for (let i = stage + 2; i < top; i += 2) {
      cells.push({ row: stage + 1, col: i });
    }
  }
  return cells;
}

export async function addGaps(
  grid: CellType[][],
  updateCells: MazeAlgoProps['updateCells'],
  stage: number,
  { top, right, bottom, left }: Direction
) {
  const rows = grid.length;
  const cols = grid[0].length;

  const topRightCells = getTopRightCells({ cols, stage, top, right });
  const rightBottomCells = getRightBottomCells({
    rows,
    cols,
    stage,
    right,
    bottom,
  });
  const bottomLeftCells = getBottomLeftCells({ rows, stage, bottom, left });
  const leftTopCells = getLeftTopCells({ stage, top, left });

  const topRightRandom = Math.floor(Math.random() * topRightCells.length);
  const rightBottomRandom = Math.floor(Math.random() * rightBottomCells.length);
  const bottomLeftRandom = Math.floor(Math.random() * bottomLeftCells.length);
  const leftTopRandom = Math.floor(Math.random() * leftTopCells.length);

  if (top === 0 || right === 0) {
    await updateCells(grid, [
      topRightCells[topRightRandom],
      bottomLeftCells[bottomLeftRandom],
    ]);
  } else {
    await updateCells(grid, [
      topRightCells[topRightRandom],
      rightBottomCells[rightBottomRandom],
      bottomLeftCells[bottomLeftRandom],
      leftTopCells[leftTopRandom],
    ]);
  }
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
  await addStages(grid, updateCells);

  const maxStage = Math.min(rows, cols) / 2 - 2;
  for (let i = 0; i < maxStage; i += 2) {
    let left = 0,
      right = 0,
      top = 0,
      bottom = 0;
    if (rows - 2 * i > 5) {
      ({ left, right } = await addHorizontalBlocks(grid, updateCells, i));
    }

    if (cols - 2 * i > 5) {
      ({ top, bottom } = await addVerticalBlocks(grid, updateCells, i));
    }

    if (rows - 2 * i > 5 || cols - 2 * i > 5) {
      await addGaps(grid, updateCells, i, { top, right, bottom, left });
    }
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
