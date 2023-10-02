import AlgorithmPage from './pages/algorithm.page';
import AllAlgorithmPage from './pages/all-algorithm.page';

export const sortingVisualizerRoutes = [
  {
    path: '/sorting-visualizer/',
    element: <AlgorithmPage />,
  },
  {
    path: '/sorting-visualizer/all',
    element: <AllAlgorithmPage />,
  },
  {
    path: '/sorting-visualizer/:algoName',
    element: <AlgorithmPage />,
  },
];
