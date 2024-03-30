import classes from './navbar.module.scss';
import CellInfo from '@pathFinder/components/cell-info/cell-info';
import AppTour from '../app-tour/app-tour';
import Title from '@/lib/components/title/title';

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
