import { generateGrid } from '../../helpers/grid';
import { CellType, MazeAlgoProps } from '../../models/interfaces';

export async function generateMazeRandomly({
  rows,
  cols,
  entry,
  exit,
  setStateCells,
  setStateGrid,
  delayDuration,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.clear);

  if (delayDuration) {
    setStateGrid({ grid, clone: true });
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (Math.random() < 0.25) {
        grid[i][j] = CellType.wall;

        if (delayDuration) {
          setStateCells([{ row: i, col: j }], CellType.wall);
          await new Promise((resolve) => setTimeout(resolve, delayDuration));
        }
      }
    }
  }

  grid[entry.row][entry.col] = CellType.entry;
  grid[exit.row][exit.col] = CellType.exit;

  if (!delayDuration) {
    setStateGrid({ grid });
  }
}
