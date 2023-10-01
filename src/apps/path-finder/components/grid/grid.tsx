import classes from "./grid.module.scss";
import { useAppSelector } from "@/store/hooks";

function Grid() {
  const rows = useAppSelector((state) => state.pathFinder.rows);
  const cols = useAppSelector((state) => state.pathFinder.cols);
  const grid = useAppSelector((state) => state.pathFinder.grid);

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${cols}, 30px)`,
    gridTemplateRows: `repeat(${rows}, 30px)`,
  };

  return (
    <div className={classes.grid} style={gridStyle}>
      {grid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <button key={`${rowIndex}-${colIndex}`}>1</button>
        ))
      )}
    </div>
  );
}

export default Grid;
