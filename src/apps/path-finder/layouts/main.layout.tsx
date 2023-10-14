import Controller from '../components/controller/controller';
import Grid from '../components/grid/grid';
import Navbar from '@/lib/navbar/navbar';
import ThemeIcon from '@/lib/theme-icon/theme-icon';

function MainLayout() {
  return (
    <>
      <ThemeIcon top={10} right={20} />
      <Navbar title="Path finder" />
      <Controller />
      <main className="text-center">
        <Grid />
      </main>
    </>
  );
}

export default MainLayout;
