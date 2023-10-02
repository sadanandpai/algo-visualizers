import classes from './visualizer.module.scss';

function NoInput() {
  return (
    <p className={classes.warning}>
      Please enter a valid list of numbers to play with the visualization
    </p>
  );
}

export default NoInput;
