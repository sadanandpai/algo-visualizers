export const enum CellType {
  clear,
  entry,
  exit,
  wall,
  visited,
  path,
}

export interface Cell {
  row: number;
  col: number;
}

export interface CellElement extends Cell {
  cellType: CellType;
}

export enum Status {
  Generating,
  Ready,
  Searching,
  Complete,
}

export interface AppState {
  rows: number;
  cols: number;
  grid: number[][];
  entry: Cell;
  exit: Cell;
  status: Status;
  visitedCellCount: number;
}

export interface SearchAlgoProps {
  grid: number[][];
  entry: Cell;
  exit: Cell;
  updateCells: (
    grid: number[][],
    cells: Cell | Cell[],
    cellType?: CellType
  ) => Promise<void>;
}

export interface MazeAlgoProps {
  rows: number;
  cols: number;
  entry: Cell;
  exit: Cell;
  updateGrid: (grid: number[][]) => void;
  updateCells: (
    grid: number[][],
    cells: Cell | Cell[],
    cellType?: CellType
  ) => Promise<void>;
}
