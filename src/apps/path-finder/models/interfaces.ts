export interface AppState {
  rows: number;
  cols: number;
  grid: number[][];
  clickType: ClickType;
  entry: { row: number; col: number } | null;
  exit: { row: number; col: number } | null;
}

export const enum ClickType {
  clear,
  entry,
  exit,
  wall,
}
