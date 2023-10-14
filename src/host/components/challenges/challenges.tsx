import ChallengeCard from './challenge-card';
import { challengesList } from '@/host/config';
import classes from './challenges.module.scss';

function Challenges() {
  return (
    <section className={classes.challenges}>
      {challengesList.map((challenge) => (
        <ChallengeCard key={challenge.name} {...challenge} />
      ))}
    </section>
  );
}

export default Challenges;
