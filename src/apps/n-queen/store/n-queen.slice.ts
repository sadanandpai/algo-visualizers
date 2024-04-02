import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '@nQueen/models/interfaces';
import { size } from '@nQueen/config';
import { initChessBoard } from '../algorithms/n-queen';
import { ChessBoard } from '../models/types';

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
  },
});

export const { setSize, setBoard } = nQueenSlice.actions;
export default nQueenSlice.reducer;
