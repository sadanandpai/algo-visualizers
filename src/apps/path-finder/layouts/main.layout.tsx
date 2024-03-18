import Controller from '@pathFinder/components/controller/controller';
import Grid from '@pathFinder/components/grid/grid';
import Navbar from '@/lib/components/navbar/navbar';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import CellInfo from '../components/cell-info/cell-info';

function MainLayout() {
  return (
    <>
      <ThemeIcon top={10} right={20} />
      <Navbar title="Path Finder">
        <CellInfo />
      </Navbar>
      <Controller />
      <main className="text-center">
        <Grid />
      </main>
    </>
  );
}

export default MainLayout;
