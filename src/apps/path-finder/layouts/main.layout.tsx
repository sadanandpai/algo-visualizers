import Navbar from '@pathFinder/components/navbar/navbar';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import Controller from '@pathFinder/components/controller/controller';
import Grid from '@pathFinder/components/grid/grid';

function MainLayout() {
  return (
    <>
      <ThemeIcon top={10} right={20} />
      <Navbar title="Path Finder" />
      <Controller />

      <main className="text-center">
        <Grid />
      </main>
    </>
  );
}

export default MainLayout;
