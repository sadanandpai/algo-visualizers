import { pauseSimulation, playSimulation } from "./global";

import { AppDispatch } from "./store";
import { AppState } from "../models/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { initialArray } from "./config";

const initialState: AppState = {
  array: initialArray,
  isPlaying: false,
  reset: false,
  time: 0,
  timeIntervalId: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setArray: (state, action: PayloadAction<number[]>) => {
      state.array = action.payload;
    },

    setIsPlaying: (state, action: PayloadAction<boolean | null>) => {
      state.isPlaying = action.payload;
      action.payload ? playSimulation() : pauseSimulation();

      if (!state.isPlaying && state.timeIntervalId) {
        clearInterval(state.timeIntervalId);
        state.timeIntervalId = null;
      }
    },

    setIntervalId: (state, action: PayloadAction<NodeJS.Timeout>) => {
      state.timeIntervalId = action.payload;
    },

    incrementTime: (state) => {
      state.time++;
    },

    setReset: (state) => {
      state.reset = !state.reset;
      pauseSimulation();
      state.time = 0;
    },
  },
});

export const {
  setArray,
  setIsPlaying,
  setReset,
  setIntervalId,
  incrementTime,
} = appSlice.actions;
export default appSlice.reducer;

export const startTimer = () => (dispatch: AppDispatch) => {
  const intervalId = setInterval(() => {
    dispatch(incrementTime());
  }, 100);
  dispatch(setIntervalId(intervalId));
};
