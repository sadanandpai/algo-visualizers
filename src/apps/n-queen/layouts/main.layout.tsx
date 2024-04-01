import Navbar from '@/lib/components/navbar/navbar';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import Board from '../components/board/board';

function MainLayout() {
  return (
    <>
      <Navbar title="N Queens Visualizer">
        <ThemeIcon bottom={10} right={20} />
      </Navbar>
      {/* <Controller /> */}
      <main className="text-center">
        <Board />
      </main>
    </>
  );
}

export default MainLayout;
