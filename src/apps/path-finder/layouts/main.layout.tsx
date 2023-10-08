import Controller from '../components/controller/controller';
import Grid from '../components/grid/grid';
import Navbar from '@/apps/sorting-visualizer/components/navbar/navbar';

function MainLayout() {
  return (
    <>
      <Navbar title="Path finder" />
      <Controller />
      <main className="text-center">
        <Grid />
      </main>
    </>
  );
}

export default MainLayout;
