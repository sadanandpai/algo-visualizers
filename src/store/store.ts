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

import appReducer from './app.slice';
import { configureStore } from '@reduxjs/toolkit';
import pathFinderReducer from '@/apps/path-finder/store/path-finder.slice';
import sortingVisualizerReducer from '@/apps/sorting-visualizer/store/sorting-visualizer.slice';
import storage from 'redux-persist/lib/storage';

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
    // pathFinder: persistReducer<ReturnType<typeof pathFinderReducer>>(
    //   {
    //     key: 'path-finder',
    //     storage,
    //   },
    pathFinder: pathFinderReducer,
    // ),
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
