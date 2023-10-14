import { NavLink } from 'react-router-dom';
import classes from './challenges.module.scss';

function ChallengeCard({
  name,
  link,
  img,
}: {
  name: string;
  link: string;
  img: string;
}) {
  return (
    <NavLink to={link} className={classes.card}>
      <h1>{name}</h1>
      <div className="">
        <img src={img} alt="" />
      </div>
    </NavLink>
  );
}

export default ChallengeCard;
