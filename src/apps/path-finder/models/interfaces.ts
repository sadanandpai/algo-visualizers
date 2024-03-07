export const enum CellType {
  clear,
  entry,
  exit,
  wall,
  fill,
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
  Ready,
  Running,
  Complete,
}

export interface AppState {
  rows: number;
  cols: number;
  grid: number[][];
  entry: Cell;
  exit: Cell;
  status: Status;
  mazeGenerator: string;
  pathFinder: string;
}

export interface AlgoProps {
  grid: number[][];
  entry: Cell;
  exit: Cell;
  setCell: (value: Cell, cellType: CellType) => void;
  setCells: (value: Cell[], cellType: CellType) => void;
  isRunning: () => boolean;
  delayDuration: number;
}
