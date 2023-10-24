import { generateGrid } from '../../helpers/grid';

export function generateMazeRandomly(
  rows: number,
  cols: number,
  cellType = { clear: 0, wall: 3 }
) {
  const grid = generateGrid(rows, cols, cellType.clear);

  grid.forEach((row) => {
    row.forEach((_, pos) => {
      if (Math.random() < 0.25) {
        row[pos] = cellType.wall;
      }
    });
  });

  return {
    grid,
    entry: null,
    exit: null,
  };
}
