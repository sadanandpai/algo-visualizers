import "./index.css";

import { RouterProvider, createHashRouter } from "react-router-dom";

import Main from "./sorting-visualizer/main";
import React from "react";
import ReactDOM from "react-dom/client";
import { sortingVisualizerRoutes } from "./sorting-visualizer/routes";

const router = createHashRouter([
  ...sortingVisualizerRoutes,
  {
    path: "/",
    element: <Main />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
