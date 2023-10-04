import Cell from '@/apps/sorting-visualizer/components/cell/cell';
import MovingCell from './moving-cell';
import SwappingCell from '@/apps/sorting-visualizer/components/cell/swapping-cell';
import { UIProps } from '@/apps/sorting-visualizer/models/interfaces';
import classes from './cell.module.scss';

const CellUI = function CellUI({
  array,
  swaps,
  sorts,
  highlights,
  moves,
  pivot,
}: UIProps) {
  function getCell(idx: number, item: number) {
    if (swaps.includes(idx)) {
      return (
        <SwappingCell
          key={idx}
          originalOrder={idx}
          order={swaps[0] === idx ? swaps[1] : swaps[0]}
          value={item}
          isHighlighted={highlights.includes(idx)}
        />
      );
    }

    if (moves && idx >= moves[0] && idx <= moves[1]) {
      return (
        <MovingCell
          key={idx}
          originalOrder={idx}
          order={idx === moves[0] ? moves[1] : idx - 1}
          isSwap={idx === moves[0]}
          value={item}
          isHighlighted={highlights.includes(idx)}
        />
      );
    }

    return (
      <Cell
        key={idx}
        order={idx}
        value={item}
        isSorted={sorts.includes(idx)}
        isHighlighted={highlights.includes(idx)}
        isPivot={idx === pivot}
      />
    );
  }

  return (
    <div className={classes.arrayContainer}>
      <ul className={classes.values} data-testid="cell-values">
        {array.map((item, idx) => getCell(idx, item))}
      </ul>

      <ul className={classes.indices}>
        {array.map((_, idx) => (
          <li key={idx}>{idx}</li>
        ))}
      </ul>
    </div>
  );
};

export default CellUI;
