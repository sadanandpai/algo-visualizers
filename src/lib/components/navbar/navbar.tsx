import Title from '@/lib/components/title/title';
import classes from './navbar.module.scss';

interface Props {
  title: string;
}

function Navbar({ title }: Props) {
  return (
    <nav className={classes.navbar}>
      <Title title={title} />
    </nav>
  );
}

export default Navbar;
