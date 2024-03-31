import { generateGrid } from '@pathFinder/helpers/grid.helper';
import { CellType, MazeAlgoProps } from '@pathFinder/models';

export async function generateSideWinderMaze({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.wall);
  updateGrid(grid);

  const topRowCells = grid[0].map((_, i) => ({ row: 0, col: i }));
  await updateCells(grid, topRowCells);

  for (let row = 2; row < rows; row += 2) {
    for (let col = 0; col < cols; col += 2) {
      const run = [{ row, col }];
      const runCells = [{ row, col }];
      while (col < cols - 2 && Math.random() < 0.5) {
        col += 2;
        run.push({ row, col });
        runCells.push({ row, col: col - 1 }, { row, col });
      }

      const northCell = run[Math.floor(Math.random() * run.length)];
      runCells.push({ row: northCell.row - 1, col: northCell.col });
      await updateCells(grid, runCells);
    }
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
