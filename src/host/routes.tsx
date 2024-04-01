import { nQueenRoutes } from '@/apps/n-queen/routes';
import { sortingVisualizerRoutes } from '@/apps/sorting-visualizer/routes';
import { pathFinderRoutes } from '@pathFinder/routes';
import { createHashRouter } from 'react-router-dom';
import Index from './pages/index.page';

export const router = createHashRouter([
  ...sortingVisualizerRoutes,
  ...pathFinderRoutes,
  ...nQueenRoutes,
  {
    path: '/',
    element: <Index />,
  },
]);
