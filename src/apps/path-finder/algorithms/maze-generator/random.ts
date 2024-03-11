import { generateGrid } from '../../helpers/grid';
import { CellType, MazeAlgoProps } from '../../models/interfaces';

export async function generateMazeRandomly({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.clear);
  updateGrid(grid);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (Math.random() < 0.25) {
        await updateCells(grid, { row: i, col: j }, CellType.wall);
      }
    }
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
