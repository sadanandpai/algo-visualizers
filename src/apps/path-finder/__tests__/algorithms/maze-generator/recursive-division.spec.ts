import {
  drawHorizontalWall,
  drawVerticalWall,
  getRandomEvenNumber,
  getRandomOddNumber,
} from '@/apps/path-finder/algorithms/maze-generator/recursive-division';
import { CellType } from '@/apps/path-finder/models/interfaces';

describe('Recursive Division', () => {
  it('getRandomEvenNumber', () => {
    for (let i = 0; i < 100; i++) {
      const min = Math.floor(Math.random() * 20);
      const max = min + Math.floor(Math.random() * 20) + 1;
      const number = getRandomEvenNumber(min, max);
      expect(number).toBeGreaterThanOrEqual(min);
      expect(number).toBeLessThanOrEqual(max);
      expect(number % 2).toBe(0);
    }
  });

  it('getRadomOddNumber', () => {
    for (let i = 0; i < 100; i++) {
      const min = Math.floor(Math.random() * 20);
      const max = min + Math.floor(Math.random() * 20) + 1;
      const number = getRandomOddNumber(min, max);
      expect(number).toBeGreaterThanOrEqual(min);
      expect(number).toBeLessThanOrEqual(max);
      expect(number % 2).toBe(1);
    }
  });

  it('drawHorizontalWall', async () => {
    const n = 10;
    const grid = Array.from({ length: n }, () => Array(n).fill(CellType.clear));
    const divisionPoint = 5;
    const passagePoint = 3;
    const start = 0;
    const end = 6;

    const updateCells = vi.fn();
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

    const [_, __, cellType] = calls.at(-1);
    expect(cellType).toBeUndefined();
  });

  it('drawVerticalWall', async () => {
    const n = 10;
    const grid = Array.from({ length: n }, () => Array(n).fill(CellType.clear));
    const divisionPoint = 5;
    const passagePoint = 3;
    const start = 0;
    const end = 6;

    const updateCells = vi.fn();
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

    const [_, __, cellType] = calls.at(-1);
    expect(cellType).toBeUndefined();
  });
});
