import { NavLink } from 'react-router-dom';
import classes from './challenges.module.scss';

interface Props {
  name: string;
  link: string;
  img: string;
}

function ChallengeCard({ name, link, img }: Props) {
  return (
    <NavLink to={link} className={classes.card}>
      <h1>{name}</h1>
      <div>
        <img src={img} alt="" />
      </div>
    </NavLink>
  );
}

export default ChallengeCard;
