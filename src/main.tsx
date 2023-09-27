import "./index.css";

import { RouterProvider, createHashRouter } from "react-router-dom";

import Home from "./apps/sorting-visualizer/pages/algorithm.page";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { sortingVisualizerRoutes } from "./apps/sorting-visualizer/routes";
import { store } from "./store/store";

const router = createHashRouter([
  ...sortingVisualizerRoutes,
  {
    path: "/",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
