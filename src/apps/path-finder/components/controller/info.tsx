import classes from './controller.module.scss';
import VisitedCellCount from './visitedCellCount';

function Info() {
  return (
    <div className={classes.info}>
      <div>
        <div className={`${classes.info__item} ${classes.info__start}`}></div>
        <span>Start</span>
      </div>
      <div>
        <div className={`${classes.info__item} ${classes.info__end}`}></div>
        <span>End</span>
      </div>
      <div>
        <div className={`${classes.info__item} ${classes.info__wall}`}></div>
        <span>Wall</span>
      </div>
      <div>
        <div className={`${classes.info__item} ${classes.info__visited}`}></div>
        <span>Visited</span>
      </div>
      <div>
        <div className={`${classes.info__item} ${classes.info__path}`}></div>
        <span>Path</span>
      </div>
      <div>
        <VisitedCellCount />
      </div>
    </div>
  );
}

export default Info;
