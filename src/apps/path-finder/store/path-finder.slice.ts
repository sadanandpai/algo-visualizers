import '@/apps/path-finder/config';

import { AppState, CellElement, CellType } from '../models/interfaces';
import { generateGrid, getDimensionsFromScreenSize } from '../helpers/grid';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { mazeGenerators } from '../algorithms/maze-generator';
import { pathFinders } from '../algorithms/path-finder';

export const { maxRows, maxCols } = getDimensionsFromScreenSize();

const initialState: AppState = {
  rows: maxRows,
  cols: maxCols,
  entry: { row: 0, col: 0 },
  exit: { row: maxRows - 1, col: maxCols - 1 },
  grid: generateGrid(maxRows, maxCols, 0),
  mazeGenerator: [...mazeGenerators.keys()][0],
  pathFinder: [...pathFinders.keys()][0],
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

    setMazeGenerator: (state, action: PayloadAction<string>) => {
      state.mazeGenerator = action.payload;
    },

    setPathFinder: (state, action: PayloadAction<string>) => {
      state.pathFinder = action.payload;
    },

    setCell: (state, action: PayloadAction<CellElement>) => {
      const payload = action.payload;
      state.grid[payload.row][payload.col] = payload.cellType;

      if (
        payload.cellType === CellType.entry ||
        payload.cellType === CellType.exit
      ) {
        const cell = payload.cellType === CellType.entry ? 'entry' : 'exit';
        state[cell] = {
          row: payload.row,
          col: payload.col,
        };
      }
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    generateMaze: (state) => {
      const mazeAlgo = mazeGenerators.get(state.mazeGenerator);
      if (mazeAlgo) {
        const { grid } = mazeAlgo.fn(
          state.rows,
          state.cols,
          state.entry,
          state.exit
        );

        state.grid = grid;
      }
    },

    resetGrid: (state) => {
      state.grid = generateGrid(state.rows, state.cols);
      state.entry = { row: 0, col: 0 };
      state.exit = { row: state.rows - 1, col: state.cols - 1 };
      state.grid[state.entry.row][state.entry.col] = CellType.entry;
      state.grid[state.exit.row][state.exit.col] = CellType.exit;
      state.isPlaying = false;
    },
  },
});

export const {
  setDimension,
  setCell,
  generateMaze,
  resetGrid,
  setIsPlaying,
  setMazeGenerator,
  setPathFinder,
} = pathFinderSlice.actions;
export default pathFinderSlice.reducer;
