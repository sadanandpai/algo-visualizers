import { RouterProvider, createHashRouter } from 'react-router-dom';

import Home from './apps/path-finder/pages/home.page';
import { Toaster } from 'sonner';
import { pathFinderRoutes } from './apps/path-finder/routes';
import { sortingVisualizerRoutes } from './apps/sorting-visualizer/routes';

const router = createHashRouter([
  ...sortingVisualizerRoutes,
  ...pathFinderRoutes,
  {
    path: '/',
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <Toaster richColors duration={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
