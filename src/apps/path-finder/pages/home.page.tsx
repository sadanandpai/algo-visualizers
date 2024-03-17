import { Toaster } from 'sonner';
import MainLayout from '@pathFinder/layouts/main.layout';

function Home() {
  return (
    <>
      <Toaster richColors duration={3000} position="top-center" />
      <MainLayout />
    </>
  );
}

export default Home;
