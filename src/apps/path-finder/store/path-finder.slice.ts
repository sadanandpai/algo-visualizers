import { AppDispatch, RootState } from '@/store/store';
import { AppState, ClickType } from '../models/interfaces';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { startBFSAlgo } from '../algorithms/bfs';

const initialState: AppState = {
  rows: 10,
  cols: 10,
  grid: generateGrid(10, 10),
  clickType: ClickType.clear,
  entry: null,
  exit: null,
};

export const pathFinderSlice = createSlice({
  name: 'pathFinder',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<number>) => {
      state.rows = action.payload;
      state.grid = generateGrid(state.rows, state.cols);
      state.entry = null;
      state.exit = null;
    },

    setCols: (state, action: PayloadAction<number>) => {
      state.cols = action.payload;
      state.grid = generateGrid(state.rows, state.cols);
      state.entry = null;
      state.exit = null;
    },

    setClickType: (state, action: PayloadAction<ClickType>) => {
      state.clickType = action.payload;
    },

    updateGrid: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      if (
        action.payload.row < 0 ||
        action.payload.row >= state.rows ||
        action.payload.col < 0 ||
        action.payload.col >= state.cols
      ) {
        return;
      }

      if (state.clickType === ClickType.entry) {
        if (state.entry !== null) {
          state.grid[state.entry.row][state.entry.col] = 0;
        }
        state.entry = action.payload;
      }

      if (state.clickType === ClickType.exit) {
        if (state.exit !== null) {
          state.grid[state.exit.row][state.exit.col] = 0;
        }
        state.exit = action.payload;
      }

      state.grid[action.payload.row][action.payload.col] = state.clickType;
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

export const { setRows, setCols, setClickType, updateGrid } =
  pathFinderSlice.actions;
export default pathFinderSlice.reducer;

export const searchPath =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().pathFinder;
    dispatch(setClickType(ClickType.fill));

    await startBFSAlgo(
      state.grid,
      state.entry!,
      state.exit!,
      (value: { row: number; col: number }) => dispatch(updateGrid(value)),
      true
    );

    dispatch(setClickType(ClickType.clear));
  };
