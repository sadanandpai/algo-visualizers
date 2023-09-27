import { configureStore } from "@reduxjs/toolkit";
import sortingVisualizerSlice from "@/apps/sorting-visualizer/store/sorting-visualizer.slice";

export const store = configureStore({
  reducer: {
    sortViz: sortingVisualizerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
