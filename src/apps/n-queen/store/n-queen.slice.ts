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
  },
});

export const { setSize, setBoard } = nQueenSlice.actions;
export default nQueenSlice.reducer;
