import '@pathFinder/config';

import {
  AppState,
  Cell,
  CellElement,
  CellType,
  Status,
} from '@pathFinder/models/interfaces';
import {
  generateGrid,
  getDimensionsFromScreenSize,
  initGrid,
} from '@/apps/path-finder/helpers/grid.helper';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const { maxRows, maxCols } = getDimensionsFromScreenSize();

const initialState: AppState = {
  rows: maxRows,
  cols: maxCols,
  entry: { row: 0, col: 0 },
  exit: { row: maxRows - 1, col: maxCols - 1 },
  grid: initGrid(maxRows, maxCols),
  status: Status.Ready,
  visitedCellCount: 0,
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

    setGrid: (
      state,
      action: PayloadAction<{ grid: CellType[][]; clone?: boolean }>
    ) => {
      if (!action.payload.clone) {
        state.grid = action.payload.grid;
        return;
      }

      const gridClone = action.payload.grid.map((row) => row.slice());
      state.grid = gridClone;
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

    clearGrid: (state) => {
      const gridClone = state.grid.map((row) => row.slice());
      for (let i = 0; i < state.rows; i++) {
        for (let j = 0; j < state.cols; j++) {
          if (
            gridClone[i][j] === CellType.visited ||
            gridClone[i][j] === CellType.path
          ) {
            gridClone[i][j] = CellType.clear;
          }
        }
      }
      state.grid = gridClone;
      state.status = Status.Ready;
    },

    resetGrid: (state) => {
      state.grid = generateGrid(state.rows, state.cols, CellType.clear);
      if (state.entry.row >= state.rows || state.entry.col >= state.cols) {
        state.entry = { row: 0, col: 0 };
      }
      state.grid[state.entry.row][state.entry.col] = CellType.entry;
      if (state.exit.row >= state.rows || state.exit.col >= state.cols) {
        state.exit = { row: state.rows - 1, col: state.cols - 1 };
      }
      state.grid[state.exit.row][state.exit.col] = CellType.exit;
      state.grid[state.exit.row][state.exit.col] = CellType.exit;
      state.status = Status.Ready;
    },
    setVisitedCellCount: (state, action: PayloadAction<number>) => {
      state.visitedCellCount = action.payload;
    },
  },
});

export const {
  setDimension,
  setGrid,
  setCell,
  setCells,
  resetGrid,
  clearGrid,
  setStatus,
  setVisitedCellCount,
} = pathFinderSlice.actions;
export default pathFinderSlice.reducer;
