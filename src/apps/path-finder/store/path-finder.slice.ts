import { AppState, ClickType } from '../models/interfaces';
import { generateGrid, randomMazeGenerator } from '../helpers/grid';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AppState = {
  rows: 10,
  cols: 10,
  grid: generateGrid(10, 10),
  clickType: ClickType.clear,
  entry: null,
  exit: null,
  isPlaying: false,
};

export const pathFinderSlice = createSlice({
  name: 'pathFinder',
  initialState,
  reducers: {
    setDimension: (
      state,
      action: PayloadAction<{ rows?: number; cols?: number }>
    ) => {
      state.rows = action.payload.rows ?? state.rows;
      state.cols = action.payload.cols ?? state.cols;
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

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    randomizeGrid: (state) => {
      const { grid, entry, exit } = randomMazeGenerator(
        state.rows,
        state.cols,
        {
          entryType: ClickType.entry,
          exitType: ClickType.exit,
          wallType: ClickType.wall,
        }
      );
      state.grid = grid;
      state.entry = entry;
      state.exit = exit;
    },

    resetGrid: (state) => {
      state.grid = generateGrid(state.rows, state.cols);
      state.entry = null;
      state.exit = null;
      state.isPlaying = false;
    },
  },
});

export const {
  setDimension,
  setClickType,
  updateGrid,
  randomizeGrid,
  resetGrid,
  setIsPlaying,
} = pathFinderSlice.actions;
export default pathFinderSlice.reducer;
