import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import { configureStore } from "@reduxjs/toolkit";
import sortingVisualizerReducer from "@/apps/sorting-visualizer/store/sorting-visualizer.slice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "sorting-visualizer",
  storage,
};

export const store = configureStore({
  reducer: {
    sortViz: persistReducer<ReturnType<typeof sortingVisualizerReducer>>(
      persistConfig,
      sortingVisualizerReducer
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
