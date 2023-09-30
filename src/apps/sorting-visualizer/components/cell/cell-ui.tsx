import Cell from "@/apps/sorting-visualizer/components/cell/cell";
import MovingCell from "./moving-cell";
import SwappingCell from "@/apps/sorting-visualizer/components/cell/swapping-cell";
import { UIProps } from "@/apps/sorting-visualizer/models/interfaces";
import classes from "./cell.module.scss";

const CellUI = function CellUI({
  array,
  swapPositions,
  sortPositions,
  highlightPositions,
  movePositions,
  pivot,
}: UIProps) {
  function getCell(idx: number, item: number) {
    if (swapPositions.includes(idx)) {
      return (
        <SwappingCell
          key={idx}
          originalOrder={idx}
          order={swapPositions[0] === idx ? swapPositions[1] : swapPositions[0]}
          value={item}
          isHighlighted={highlightPositions.includes(idx)}
        />
      );
    }

    if (movePositions && idx >= movePositions[0] && idx <= movePositions[1]) {
      return (
        <MovingCell
          key={idx}
          originalOrder={idx}
          order={idx === movePositions[0] ? movePositions[1] : idx - 1}
          isSwap={idx === movePositions[0]}
          value={item}
          isHighlighted={highlightPositions.includes(idx)}
        />
      );
    }

    return (
      <Cell
        key={idx}
        order={idx}
        value={item}
        isSorted={sortPositions.includes(idx)}
        isHighlighted={highlightPositions.includes(idx)}
        isPivot={idx === pivot}
      />
    );
  }

  return (
    <div className={classes.arrayContainer}>
      <ul className={classes.values}>
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
