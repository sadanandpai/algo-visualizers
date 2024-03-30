import Title from '@/lib/components/title/title';
import AppTour from '@pathFinder/components/app-tour/app-tour';
import CellInfo from '@pathFinder/components/cell-info/cell-info';
import classes from './navbar.module.scss';

export interface Props {
  title: string;
  children?: React.ReactNode;
}

function Navbar({ title }: Props) {
  return (
    <nav className={classes.navbar}>
      <Title title={title} />
      <AppTour />
      <CellInfo />
    </nav>
  );
}

export default Navbar;
