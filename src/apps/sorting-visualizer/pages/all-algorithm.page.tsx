import AllAlgorithmLayout from '@/apps/sorting-visualizer/layouts/all-algorithm.layout';
import { Toaster } from 'sonner';

function AllAlgorithmPage() {
  return (
    <>
      <Toaster richColors duration={3000} />
      <AllAlgorithmLayout />
    </>
  );
}

export default AllAlgorithmPage;
