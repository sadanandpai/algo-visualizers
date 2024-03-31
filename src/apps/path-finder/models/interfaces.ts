import { CellType, Status } from './enum';

export interface Cell {
  row: number;
  col: number;
}

export interface CellElement extends Cell {
  cellType: CellType;
}

export interface AppState {
  rows: number;
  cols: number;
  grid: number[][];
  entry: Cell;
  exit: Cell;
  status: Status;
  visitedCellCount: number;
  pathLength: number;
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

export interface PathAlgoProps {
  parents: Cell[][];
  entry: Cell;
  exit: Cell;
  updateCell: (value: Cell) => Promise<void>;
}
