import Main from "./main";

export const sortingVisualizerRoutes = [
  {
    path: "/sorting-visualizer/",
    element: <Main />,
  },
  {
    path: "/sorting-visualizer/:algoName",
    element: <Main />,
  },
];
