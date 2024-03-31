import { generateGrid } from '@pathFinder/helpers/grid.helper';
import { MazeAlgoProps } from '@pathFinder/models';
import { CellType } from '@pathFinder/models/enum';

enum EdgeType {
  horizontal,
  vertical,
}

function getEdges(grid: CellType[][]) {
  const edges = [];
  for (let row = 0; row < grid.length; row++) {
    const start = row % 2 === 0 ? 1 : 0;
    for (let col = start; col < grid[0].length; col += 2) {
      edges.push({
        row,
        col,
        edgeType: row % 2 === 0 ? EdgeType.horizontal : EdgeType.vertical,
      });
    }
  }
  return edges;
}

function getCells(grid: CellType[][]) {
  const cells = [];
  for (let row = 0; row < grid.length; row += 2) {
    for (let col = 0; col < grid[0].length; col += 2) {
      cells.push({ row, col });
    }
  }
  return cells;
}

function getConnections({
  row,
  col,
  edgeType,
}: {
  row: number;
  col: number;
  edgeType: EdgeType;
}) {
  if (edgeType === EdgeType.horizontal) {
    return [
      { row: row, col: col - 1 },
      { row: row, col: col + 1 },
    ];
  }

  return [
    { row: row - 1, col: col },
    { row: row + 1, col: col },
  ];
}

export async function generateKruskalMaze({
  rows,
  cols,
  entry,
  exit,
  updateGrid,
  updateCells,
}: MazeAlgoProps) {
  const grid = generateGrid(rows, cols, CellType.wall);
  updateGrid(grid);

  const edges = getEdges(grid);
  const cells = getCells(grid);
  const sets = cells.map(({ row, col }) => new Set([`${row}-${col}`]));

  while (edges.length) {
    const randomEdgeIdx = Math.floor(Math.random() * edges.length);
    const randomEdge = edges.splice(randomEdgeIdx, 1)[0];
    const [cell1, cell2] = getConnections(randomEdge);

    const set1 = sets.find((set) =>
      set.has(`${cell1.row}-${cell1.col}`)
    ) as Set<string>;
    const set2 = sets.find((set) =>
      set.has(`${cell2.row}-${cell2.col}`)
    ) as Set<string>;

    if (set1 !== set2) {
      set2.forEach((cell) => set1.add(cell));
      sets.splice(sets.indexOf(set2), 1);
      await updateCells(grid, [cell1, cell2, randomEdge]);
    } else {
      await updateCells(grid, randomEdge, CellType.wall);
    }
  }

  updateCells(grid, entry, CellType.entry);
  updateCells(grid, exit, CellType.exit);
  return grid;
}
