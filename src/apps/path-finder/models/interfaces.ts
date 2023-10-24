export interface AppState {
  rows: number;
  cols: number;
  grid: number[][];
  clickType: ClickType;
  entry: { row: number; col: number } | null;
  exit: { row: number; col: number } | null;
  isPlaying: boolean;
  mazeGenerator: string;
  pathFinder: string;
}

export const enum ClickType {
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
