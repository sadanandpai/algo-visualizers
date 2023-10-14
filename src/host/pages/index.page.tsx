import Challenges from '../components/challenges/challenges';
import Navbar from '@/lib/navbar/navbar';
import ThemeIcon from '@/lib/theme-icon/theme-icon';

function Index() {
  return (
    <>
      <ThemeIcon top={10} right={20} />
      <Navbar title="Algo visualizers" />
      <Challenges />
    </>
  );
}

export default Index;
