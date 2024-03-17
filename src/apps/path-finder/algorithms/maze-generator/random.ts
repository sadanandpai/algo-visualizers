import { generateGrid } from '@/apps/path-finder/helpers/grid.helper';
import { CellType, MazeAlgoProps } from '@pathFinder/models/interfaces';

export async function generateRandomMaze({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.clear);
  updateGrid(grid);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (Math.random() < 0.25) {
        await updateCells(grid, { row, col }, CellType.wall);
      }
    }
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
