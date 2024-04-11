import { initialArray, selectedAlgosStatus } from '@sortViz/config';
import {
  maxInterval,
  simulator,
  setHighlightInterval,
  setSwapInterval,
} from './global.state';

import { AppDispatch } from '@/host/store/store';
import { AppState } from '@sortViz/models/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AppState = {
  array: initialArray,
  visualizerType: 'cell',
  isPlaying: false,
  reset: false,
  time: 0,
  speed: 5,
  timeIntervalId: null,
  selectedAlgosStatus,
};

function setIntervals(state: AppState) {
  if (state.visualizerType === 'cell') {
    setSwapInterval(maxInterval / state.speed);
  } else {
    setSwapInterval(maxInterval / (state.speed * 4));
  }
  setHighlightInterval(maxInterval / (state.speed * 4));
}

export const sortingVisualizerSlice = createSlice({
  name: 'sortViz',
  initialState,
  reducers: {
    setArray: (state, action: PayloadAction<number[]>) => {
      state.array = action.payload;
    },

    setIsPlaying: (state, action: PayloadAction<boolean | null>) => {
      state.isPlaying = action.payload;
      action.payload ? simulator.start() : simulator.pause();

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
      simulator.pause();
      state.time = 0;
    },

    modifyAlgoSelection: (state, action: PayloadAction<number>) => {
      state.selectedAlgosStatus[action.payload] =
        !state.selectedAlgosStatus[action.payload];
    },

    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
      setIntervals(state);
    },

    toggleVisualizerType: (state) => {
      state.visualizerType = state.visualizerType === 'cell' ? 'bar' : 'cell';
      setIntervals(state);
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
  toggleVisualizerType,
} = sortingVisualizerSlice.actions;
export default sortingVisualizerSlice.reducer;

export const startTimer = () => (dispatch: AppDispatch) => {
  const intervalId = setInterval(() => {
    dispatch(incrementTime());
  }, 100);
  dispatch(setIntervalId(intervalId));
};
