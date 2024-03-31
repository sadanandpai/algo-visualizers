import classes from './cell-info.module.scss';

function CellInfo() {
  return (
    <div className={classes.cellInfo}>
      <div>
        <div className={`${classes.item} ${classes.entry}`}></div>
        <span>Entry</span>
      </div>
      <div>
        <div className={`${classes.item} ${classes.exit}`}></div>
        <span>Exit</span>
      </div>
      <div>
        <div className={`${classes.item} ${classes.wall}`}></div>
        <span>Wall</span>
      </div>
      <div>
        <div className={`${classes.item} ${classes.visited}`}></div>
        <span>Visit</span>
      </div>
      <div>
        <div className={`${classes.item} ${classes.path}`}></div>
        <span>Path</span>
      </div>
    </div>
  );
}

export default CellInfo;
