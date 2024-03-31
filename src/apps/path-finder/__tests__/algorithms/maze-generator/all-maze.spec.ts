import { CellType } from '@pathFinder/models/enum';
import { mazeGenerators } from '@pathFinder/algorithms';
import { Cell } from '@pathFinder/models';

const mazeGeneratorsFns = [
  mazeGenerators.get('prims')!.fn,
  mazeGenerators.get('kruskal')!.fn,
  mazeGenerators.get('recursiveBacktracking')!.fn,
  mazeGenerators.get('recursiveDivision')!.fn,
  mazeGenerators.get('wilson')!.fn,
  mazeGenerators.get('binary')!.fn,
  mazeGenerators.get('ellers')!.fn,
  mazeGenerators.get('sideWinder')!.fn,
  mazeGenerators.get('labyrinth')!.fn,
];

const updateCells = vi.fn(async (grid, cells, cellType = CellType.clear) => {
  if (!Array.isArray(cells)) {
    cells = [cells];
  }

  cells.forEach((cell: Cell) => {
    grid[cell.row][cell.col] = cellType;
  });
});

describe('Maze generator functions', () => {
  beforeEach(() => {
    updateCells.mockClear();
  });

  it('generate maze with entry & exit on clear slots', async () => {
    const rows = 9;
    const cols = 17;
    const updateGrid = vi.fn();

    for await (const mazeFn of mazeGeneratorsFns) {
      const grid = await mazeFn({
        rows,
        cols,
        entry: { row: 0, col: 0 },
        exit: { row: rows - 1, col: cols - 1 },
        updateGrid,
        updateCells,
      });

      expect(grid.length).toBe(rows);
      expect(grid[0].length).toBe(cols);
      expect(updateGrid).toBeCalled();
      expect(updateCells).toBeCalled();

      for (let row = 1; row < rows; row += 2) {
        for (let col = 1; col < cols; col += 2) {
          expect(grid[row][col]).toBe(CellType.wall);
        }
      }

      const cells = new Map([
        [CellType.entry, 0],
        [CellType.exit, 0],
        [CellType.clear, 0],
        [CellType.wall, 0],
      ]);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          cells.set(grid[row][col], cells.get(grid[row][col])! + 1);
        }
      }

      const wallCells = Math.floor(rows / 2) * (cols - 1);
      const clearCells = rows * cols - wallCells - 2;
      expect(cells.get(CellType.entry)).toBe(1);
      expect(cells.get(CellType.exit)).toBe(1);
      expect(cells.get(CellType.wall)).toBe(wallCells);
      expect(cells.get(CellType.clear)).toBe(clearCells);
    }
  });

  it('generate maze with entry & exit on walls slots', async () => {
    const rows = 9;
    const cols = 21;
    const updateGrid = vi.fn();

    for await (const mazeFn of mazeGeneratorsFns) {
      const grid = await mazeFn({
        rows,
        cols,
        entry: { row: 3, col: 5 },
        exit: { row: rows - 2, col: cols - 6 },
        updateGrid,
        updateCells,
      });

      expect(grid.length).toBe(rows);
      expect(grid[0].length).toBe(cols);
      expect(updateGrid).toBeCalled();
      expect(updateCells).toBeCalled();

      for (let row = 1; row < rows; row += 2) {
        for (let col = 1; col < cols; col += 2) {
          if (
            (row === 3 && col === 5) ||
            (row === rows - 2 && col === cols - 6)
          ) {
            continue;
          }
          expect(grid[row][col]).toBe(CellType.wall);
        }
      }

      const cells = new Map([
        [CellType.entry, 0],
        [CellType.exit, 0],
        [CellType.clear, 0],
        [CellType.wall, 0],
      ]);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          cells.set(grid[row][col], cells.get(grid[row][col])! + 1);
        }
      }

      const wallCells = Math.floor(rows / 2) * (cols - 1) - 2;
      const clearCells = rows * cols - wallCells - 2;
      expect(cells.get(CellType.entry)).toBe(1);
      expect(cells.get(CellType.exit)).toBe(1);
      expect(cells.get(CellType.wall)).toBe(wallCells);
      expect(cells.get(CellType.clear)).toBe(clearCells);
    }
  });
});
