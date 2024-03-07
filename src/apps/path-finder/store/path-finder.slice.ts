import '@/apps/path-finder/config';

import {
  AppState,
  Cell,
  CellElement,
  CellType,
  Status,
} from '../models/interfaces';
import {
  generateGrid,
  getDimensionsFromScreenSize,
  initGrid,
} from '../helpers/grid';

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
  grid: initGrid(maxRows, maxCols),
  mazeGenerator: [...mazeGenerators.keys()][0],
  pathFinder: [...pathFinders.keys()][0],
  status: Status.Ready,
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

    setCells: (
      state,
      action: PayloadAction<{ cells: Cell[]; cellType: CellType }>
    ) => {
      const { cells, cellType } = action.payload;

      const gridClone = state.grid.map((row) => row.slice());
      cells.forEach((cell) => {
        gridClone[cell.row][cell.col] = cellType;
      });

      state.grid = gridClone;
    },

    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
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
      state.grid = generateGrid(state.rows, state.cols, CellType.clear);
      state.grid[state.entry.row][state.entry.col] = CellType.entry;
      state.grid[state.exit.row][state.exit.col] = CellType.exit;
      state.status = Status.Ready;
    },

    clearGrid: (state) => {
      const gridClone = state.grid.map((row) => row.slice());
      for (let i = 0; i < state.rows; i++) {
        for (let j = 0; j < state.cols; j++) {
          if (
            gridClone[i][j] === CellType.fill ||
            gridClone[i][j] === CellType.path
          ) {
            gridClone[i][j] = CellType.clear;
          }
        }
      }
      state.grid = gridClone;
    },
  },
});

export const {
  setDimension,
  setCell,
  setCells,
  generateMaze,
  resetGrid,
  clearGrid,
  setMazeGenerator,
  setPathFinder,
  setStatus,
} = pathFinderSlice.actions;
export default pathFinderSlice.reducer;
