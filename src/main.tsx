import './index.scss';

import { RouterProvider, createHashRouter } from 'react-router-dom';
import { persistor, store } from './store/store';

import Home from './apps/sorting-visualizer/pages/algorithm.page';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { sortingVisualizerRoutes } from './apps/sorting-visualizer/routes';

const router = createHashRouter([
  ...sortingVisualizerRoutes,
  {
    path: '/',
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
