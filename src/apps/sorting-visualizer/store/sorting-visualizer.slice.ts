import { initialArray, selectedAlgosStatus } from "../config";
import { pauseSimulation, playSimulation } from "./global.state";

import { AppDispatch } from "../../../store/store";
import { AppState } from "../models/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState = {
  array: initialArray,
  isPlaying: false,
  reset: false,
  time: 0,
  speed: 5,
  timeIntervalId: null,
  selectedAlgosStatus,
};

export const sortingVisualizerSlice = createSlice({
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

    modifyAlgoSelection: (state, action: PayloadAction<number>) => {
      state.selectedAlgosStatus[action.payload] =
        !state.selectedAlgosStatus[action.payload];
    },

    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
  },
});

export const {
  setArray,
  setIsPlaying,
  setReset,
  setSpeed,
  setIntervalId,
  incrementTime,
  modifyAlgoSelection,
} = sortingVisualizerSlice.actions;
export default sortingVisualizerSlice.reducer;

export const startTimer = () => (dispatch: AppDispatch) => {
  const intervalId = setInterval(() => {
    dispatch(incrementTime());
  }, 100);
  dispatch(setIntervalId(intervalId));
};
