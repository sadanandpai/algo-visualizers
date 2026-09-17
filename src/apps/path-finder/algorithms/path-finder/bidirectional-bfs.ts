import { generateGrid } from '@pathFinder/helpers/grid.helper';
import { SearchAlgoProps, Cell, CellType } from '@pathFinder/models';

interface Frontier {
  queue: Cell[];
  distances: number[][];
  parents: Cell[][];
}

const directions = [
  { row: -1, col: 0 },
  { row: 0, col: -1 },
  { row: 1, col: 0 },
  { row: 0, col: 1 },
];

function createFrontier(rows: number, cols: number, start: Cell): Frontier {
  const distances = generateGrid(rows, cols, -1);
  distances[start.row][start.col] = 0;

  return {
    queue: [start],
    distances,
    parents: generateGrid<Cell>(rows, cols, null),
  };
}

function isSameCell(a: Cell, b: Cell) {
  return a.row === b.row && a.col === b.col;
}

// Expands one complete level of the frontier. Every cell of the level is
// processed before deciding on a meeting point, so that the meeting cell with
// the smallest combined distance from both ends is picked.
async function expandLevel(
  grid: CellType[][],
  frontier: Frontier,
  other: Frontier,
  updateCells: SearchAlgoProps['updateCells'],
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const nextQueue: Cell[] = [];
  let meetingCell: Cell | null = null;
  let meetingDistance = Infinity;

  const visitedCells = frontier.queue.filter(
    ({ row, col }) => grid[row][col] === CellType.clear,
  );
  if (visitedCells.length > 0) {
    await updateCells(grid, visitedCells, CellType.visited);
  }

  for (const cell of frontier.queue) {
    const distance = frontier.distances[cell.row][cell.col] + 1;

    for (const direction of directions) {
      const row = cell.row + direction.row;
      const col = cell.col + direction.col;

      if (row < 0 || row >= rows || col < 0 || col >= cols) {
        continue;
      }

      if (
        grid[row][col] === CellType.wall ||
        frontier.distances[row][col] !== -1
      ) {
        continue;
      }

      frontier.distances[row][col] = distance;
      frontier.parents[row][col] = { row: cell.row, col: cell.col };
      nextQueue.push({ row, col });

      const otherDistance = other.distances[row][col];
      if (otherDistance !== -1 && distance + otherDistance < meetingDistance) {
        meetingDistance = distance + otherDistance;
        meetingCell = { row, col };
      }
    }
  }

  frontier.queue = nextQueue;
  return meetingCell;
}

// Joins the two halves of the path so that following the parents from the
// exit leads to the entry, as the path tracer expects.
function joinPaths(
  forward: Frontier,
  backward: Frontier,
  meetingCell: Cell,
  exit: Cell,
) {
  const parents = forward.parents.map((row) => row.slice());

  let current = meetingCell;
  while (!isSameCell(current, exit)) {
    const next = backward.parents[current.row][current.col];
    parents[next.row][next.col] = current;
    current = next;
  }

  return parents;
}

// Bidirectional breadth first search
export async function bidirectionalSearch({
  grid: stateGrid,
  entry,
  exit,
  updateCells,
}: SearchAlgoProps) {
  const grid = stateGrid.map((row) => row.slice());
  const rows = grid.length;
  const cols = grid[0].length;

  const forward = createFrontier(rows, cols, entry);
  const backward = createFrontier(rows, cols, exit);

  while (forward.queue.length > 0 && backward.queue.length > 0) {
    let meetingCell = await expandLevel(grid, forward, backward, updateCells);
    if (!meetingCell) {
      meetingCell = await expandLevel(grid, backward, forward, updateCells);
    }

    if (meetingCell) {
      const parents = joinPaths(forward, backward, meetingCell, exit);
      return { grid, parents };
    }
  }

  return { grid, parents: null };
}
