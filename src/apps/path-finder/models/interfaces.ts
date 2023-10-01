export interface AppState {
  rows: number;
  cols: number;
  grid: number[][];
  clickType: ClickType;
}

export const enum ClickType {
  clear,
  entry,
  exit,
  wall,
}
