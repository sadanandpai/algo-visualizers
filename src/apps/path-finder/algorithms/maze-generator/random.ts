import { generateGrid } from '../../helpers/grid';
import { Cell, CellType, MazeAlgoProps } from '../../models/interfaces';

export function generateMazeRandomly({
  rows,
  cols,
  entry,
  exit,
  setStateCells,
  setStateGrid,
  delayDuration,
}: MazeAlgoProps) {
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

  setStateGrid({ grid });
}
