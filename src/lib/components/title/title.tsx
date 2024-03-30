import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import classes from './title.module.scss';

interface Props {
  title: string;
}

function Title({ title }: Props) {
  return (
    <h1 className={classes.title} data-testid="title">
      <Link to="/" className={classes.home}>
        <Home size={24} />
      </Link>
      {title}
      <a href="https://github.com/sadanandpai/algo-visualizers" target="blank">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="github repo"
          className={classes.github}
        />
      </a>
    </h1>
  );
}

export default Title;
