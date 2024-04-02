import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import nQueenReducer from '@/apps/n-queen/store/n-queen.slice';
import sortingVisualizerReducer from '@/apps/sorting-visualizer/store/sorting-visualizer.slice';
import pathFinderReducer from '@pathFinder/store/path-finder.slice';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import appReducer from './app.slice';

export const store = configureStore({
  reducer: {
    app: persistReducer<ReturnType<typeof appReducer>>(
      {
        key: 'app',
        storage,
      },
      appReducer
    ),
    sortViz: persistReducer<ReturnType<typeof sortingVisualizerReducer>>(
      {
        key: 'sorting-viz',
        storage,
      },
      sortingVisualizerReducer
    ),
    pathFinder: pathFinderReducer,
    nQueen: nQueenReducer,
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
