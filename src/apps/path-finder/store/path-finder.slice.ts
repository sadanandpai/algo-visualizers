import { AppState } from "../models/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState = {
  rows: 10,
  cols: 10,
  grid: generateGrid(10, 10),
  clickType: "entry",
};

export const pathFinderSlice = createSlice({
  name: "pathFinder",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<number>) => {
      state.rows = action.payload;
      state.grid = generateGrid(state.rows, state.cols);
    },

    setCols: (state, action: PayloadAction<number>) => {
      state.cols = action.payload;
      state.grid = generateGrid(state.rows, state.cols);
    },

    setClickType: (state, action: PayloadAction<AppState["clickType"]>) => {
      state.clickType = action.payload;
    },
  },
});

function generateGrid(rows: number, cols: number) {
  const grid: number[][] = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}

export const { setRows, setCols, setClickType } = pathFinderSlice.actions;
export default pathFinderSlice.reducer;
