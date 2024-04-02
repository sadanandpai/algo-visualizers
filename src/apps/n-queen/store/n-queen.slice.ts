import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '@nQueen/models/interfaces';
import { size } from '@nQueen/config';

const initialState: AppState = {
  size: size,
};

export const nQueenSlice = createSlice({
  name: 'nQueen',
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
  },
});

export const { setSize } = nQueenSlice.actions;
export default nQueenSlice.reducer;
