import { useAppSelector } from '@/host/store/hooks';
import { pathFinders } from '@pathFinder/algorithms';
import gridClasses from '@pathFinder/components/grid/grid.module.scss';
import classes from './race-board.module.scss';

const laneCellSize = 10;

function RaceBoard() {
  const race = useAppSelector((state) => state.pathFinder.race);

  if (!race) {
    return null;
  }

  return (
    <div className={classes.raceBoard}>
      {race.lanes.map((lane, laneIndex) => {
        const gridStyle: React.CSSProperties = {
          gridTemplateRows: `repeat(${lane.grid.length}, ${laneCellSize}px)`,
          gridTemplateColumns: `repeat(${lane.grid[0].length}, ${laneCellSize}px)`,
        };

        return (
          <section
            key={`${laneIndex}-${lane.algorithm}`}
            className={classes.lane}
            data-testid="race-lane"
          >
            <h3>{pathFinders.get(lane.algorithm)?.name ?? lane.algorithm}</h3>
            <p className={classes.stats}>
              <span>
                Visits: <b data-testid="race-visits">{lane.visitedCellCount}</b>
              </span>
              <span>
                Path: <b data-testid="race-path">{lane.pathLength}</b>
              </span>
              <span>
                Rank: <b data-testid="race-rank">{lane.rank ?? ''}</b>
              </span>
            </p>
            <div
              className={`${gridClasses.grid} ${classes.laneGrid}`}
              style={gridStyle}
            >
              {lane.grid.map((row, rowIndex) =>
                row.map((cellType, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    data-row={rowIndex}
                    data-col={colIndex}
                    data-cell-type={cellType}
                    className={gridClasses['type' + cellType]}
                  ></div>
                )),
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default RaceBoard;
