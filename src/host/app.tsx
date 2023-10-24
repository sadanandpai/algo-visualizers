import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './routes';

function App() {
  return (
    <>
      <Toaster richColors duration={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
