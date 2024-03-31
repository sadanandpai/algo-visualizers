import Index from './pages/index.page';
import { createHashRouter } from 'react-router-dom';
import { pathFinderRoutes } from '@pathFinder/routes';
import { sortingVisualizerRoutes } from '@/apps/sorting-visualizer/routes';

export const router = createHashRouter([
  ...sortingVisualizerRoutes,
  ...pathFinderRoutes,
  {
    path: '/',
    element: <Index />,
  },
]);
