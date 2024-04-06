import type { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@nQueen/models/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { size } from '@nQueen/config';
import { ChessBoard } from '@nQueen/models/types';
import { initChessBoard } from '@nQueen/helpers/board.helper';

const initialState: AppState = {
  size: size,
  board: initChessBoard(size),
};

export const nQueenSlice = createSlice({
  name: 'nQueen',
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
      state.board = initChessBoard(action.payload);
    },

    setBoard: (state, action: PayloadAction<ChessBoard>) => {
      state.board = action.payload;
    },

    updateBoard: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      const { row, col } = action.payload;
      state.board[row][col] = !state.board[row][col];
    },
  },
});

export const { setSize, setBoard, updateBoard } = nQueenSlice.actions;
export default nQueenSlice.reducer;
