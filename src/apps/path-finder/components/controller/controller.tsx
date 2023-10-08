import Dimension from './dimension';
import Operations from './operations';
import classes from './controller.module.scss';

function Controller() {
  return (
    <section className={classes.controller}>
      <Operations />
      <Dimension />
    </section>
  );
}

export default Controller;
