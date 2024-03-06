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
  isPlaying: boolean;
  mazeGenerator: string;
  pathFinder: string;
}

export const enum CellType {
  clear,
  entry,
  exit,
  wall,
  fill,
  path,
}
