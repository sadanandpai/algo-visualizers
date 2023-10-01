export interface AppState {
  rows: number;
  cols: number;
  grid: number[][];
  clickType: "entry" | "exit" | "wall" | "clear";
}
