import Navbar from '@/lib/components/navbar/navbar';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import Board from '@nQueen/components/board/board';

function MainLayout() {
  return (
    <>
      <ThemeIcon bottom={10} right={20} />
      <Navbar title="N Queen Visualizer"></Navbar>
      {/* <Controller /> */}
      <main className="text-center">
        <Board />
      </main>
    </>
  );
}

export default MainLayout;
