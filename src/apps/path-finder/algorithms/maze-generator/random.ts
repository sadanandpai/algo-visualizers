import { generateGrid } from '../../helpers/grid';
import { Cell, CellType } from '../../models/interfaces';

export function generateMazeRandomly(
  rows: number,
  cols: number,
  entry: Cell,
  exit: Cell
) {
  const grid = generateGrid(rows, cols, CellType.clear);

  grid.forEach((row) => {
    row.forEach((_, pos) => {
      if (Math.random() < 0.25) {
        row[pos] = CellType.wall;
      }
    });
  });

  grid[entry.row][entry.col] = CellType.entry;
  grid[exit.row][exit.col] = CellType.exit;

  return {
    grid,
  };
}
