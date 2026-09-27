import Navbar from '@pathFinder/components/navbar/navbar';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import Controller from '@pathFinder/components/controller/controller';
import Grid from '@pathFinder/components/grid/grid';
import RaceBoard from '@pathFinder/components/race-board/race-board';
import { useAppSelector } from '@/host/store/hooks';

function MainLayout() {
  const isRacing = useAppSelector((state) => state.pathFinder.race !== null);

  return (
    <>
      <ThemeIcon top={10} right={20} />
      <Navbar title="Path Finder" />
      <Controller />

      <main className="text-center">{isRacing ? <RaceBoard /> : <Grid />}</main>
    </>
  );
}

export default MainLayout;
