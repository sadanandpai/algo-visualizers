import '@/apps/path-finder/config';

import { AppState, Cell, ClickType } from '../models/interfaces';
import {
  generateGrid,
  getDimensionsFromScrenSize,
  randomMazeGenerator,
} from '../helpers/grid';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const { maxRows, maxCols } = getDimensionsFromScrenSize();

const initialState: AppState = {
  rows: maxRows,
  cols: maxCols,
  entry: null,
  exit: null,
  isPlaying: false,
  clickType: ClickType.clear,
  grid: generateGrid(maxRows, maxCols),
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

    setEntry: (state, action: PayloadAction<Cell>) => {
      if (state.entry !== null) {
        state.grid[state.entry.row][state.entry.col] = 0;
      }
      state.entry = action.payload;
      state.grid[action.payload.row][action.payload.col] = state.clickType;
    },

    setExit: (state, action: PayloadAction<Cell>) => {
      if (state.exit !== null) {
        state.grid[state.exit.row][state.exit.col] = 0;
      }
      state.exit = action.payload;
      state.grid[action.payload.row][action.payload.col] = state.clickType;
    },

    setCell: (state, action: PayloadAction<Cell>) => {
      const cellType = state.grid[action.payload.row][action.payload.col];
      if (cellType === ClickType.entry) {
        state.entry = null;
      } else if (cellType === ClickType.exit) {
        state.exit = null;
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
  setEntry,
  setExit,
  setCell,
  randomizeGrid,
  resetGrid,
  setIsPlaying,
} = pathFinderSlice.actions;
export default pathFinderSlice.reducer;
