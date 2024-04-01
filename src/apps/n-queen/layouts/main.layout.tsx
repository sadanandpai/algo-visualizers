import Navbar from '@/lib/components/navbar/navbar';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import Board from '../components/board/board';

function MainLayout() {
  return (
    <>
      <ThemeIcon top={10} right={20} />
      <Navbar title="N Queens Visualizer" />
      {/* <Controller /> */}
      <main className="text-center">
        <Board />
      </main>
    </>
  );
}

export default MainLayout;
