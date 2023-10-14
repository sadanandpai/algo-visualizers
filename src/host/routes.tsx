import Index from './pages/index.page';
import { createHashRouter } from 'react-router-dom';
import { pathFinderRoutes } from '@/apps/path-finder/routes';
import { sortingVisualizerRoutes } from '@/apps/sorting-visualizer/routes';

export const router = createHashRouter([
  ...sortingVisualizerRoutes,
  ...pathFinderRoutes,
  {
    path: '/',
    element: <Index />,
  },
]);
