import classes from './cell-info.module.scss';

function CellInfo() {
  return (
    <div className={classes.cellInfo}>
      <div>
        <div className={`${classes.item} ${classes.start}`}></div>
        <span>Start</span>
      </div>
      <div>
        <div className={`${classes.item} ${classes.end}`}></div>
        <span>End</span>
      </div>
      <div>
        <div className={`${classes.item} ${classes.wall}`}></div>
        <span>Wall</span>
      </div>
      <div>
        <div className={`${classes.item} ${classes.visited}`}></div>
        <span>Visited</span>
      </div>
      <div>
        <div className={`${classes.item} ${classes.path}`}></div>
        <span>Path</span>
      </div>
    </div>
  );
}

export default CellInfo;
