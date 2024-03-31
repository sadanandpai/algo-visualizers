import {
  drawHorizontalWall,
  drawVerticalWall,
} from '@pathFinder/algorithms/maze-generator/recursive-division';
import { Cell, CellType } from '@pathFinder/models';

const updateCells = vi.fn(async (grid, cells, cellType = CellType.clear) => {
  if (!Array.isArray(cells)) {
    cells = [cells];
  }

  cells.forEach((cell: Cell) => {
    grid[cell.row][cell.col] = cellType;
  });
});

describe('Recursive Division maze helpers', () => {
  beforeEach(() => {
    updateCells.mockClear();
  });

  it('drawHorizontalWall', async () => {
    const rows = 9;
    const cols = 15;
    const grid = Array.from({ length: rows }, () =>
      Array(cols).fill(CellType.clear)
    );
    const divisionPoint = 5;
    const passagePoint = 3;
    const start = 0;
    const end = 6;

    await drawHorizontalWall(grid, {
      updateCells,
      divisionPoint,
      passagePoint,
      start,
      end,
    });

    const calls = updateCells.mock.calls;
    calls.slice(0, calls.length - 1).forEach((call) => {
      const [_, __, cellType] = call;
      expect(cellType).toBe(CellType.wall);
    });

    const [_, __, cellType] = calls.at(-1)!;
    expect(cellType).toBeUndefined();
  });

  it('drawVerticalWall', async () => {
    const rows = 9;
    const cols = 15;
    const grid = Array.from({ length: rows }, () =>
      Array(cols).fill(CellType.clear)
    );
    const divisionPoint = 5;
    const passagePoint = 3;
    const start = 0;
    const end = 6;

    await drawVerticalWall(grid, {
      updateCells,
      divisionPoint,
      passagePoint,
      start,
      end,
    });

    const calls = updateCells.mock.calls;
    calls.slice(0, calls.length - 1).forEach((call) => {
      const [_, __, cellType] = call;
      expect(cellType).toBe(CellType.wall);
    });

    const [_, __, cellType] = calls.at(-1)!;
    expect(cellType).toBeUndefined();
  });
});
