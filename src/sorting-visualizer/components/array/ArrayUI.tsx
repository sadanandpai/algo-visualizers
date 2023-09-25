import { ArrayUIProps } from "@/sorting-visualizer/models/interfaces";
import Cell from "@/sorting-visualizer/components/array/Cell";
import MovingCell from "./MovingCell";
import SwappingCell from "@/sorting-visualizer/components/array/SwappingCell";
import classes from "./array.module.scss";
import { memo } from "react";

const ArrayUI = memo(function ArrayUI({
  array,
  swapPositions,
  sortPositions,
  highlightPositions,
  movePositions,
  pivot,
}: ArrayUIProps) {
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

      <div className={classes.indices}>
        {array.map((_, idx) => (
          <span key={idx}>{idx}</span>
        ))}
      </div>
    </div>
  );
});

export default ArrayUI;
