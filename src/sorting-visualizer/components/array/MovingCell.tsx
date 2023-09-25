import {
  getMovingAnimation,
  getSwapAnimation,
} from "@/sorting-visualizer/helpers/keyFramesHelpers";

import Cell from "@/sorting-visualizer/components/array/Cell";
import { MovingCellProps } from "@/sorting-visualizer/models/interfaces";
import { interval } from "@/sorting-visualizer/store/global";

function MovingCell({
  originalOrder,
  isSwap,
  order,
  value,
  isHighlighted,
}: MovingCellProps) {
  let animation = getMovingAnimation(originalOrder - order, interval);

  if (isSwap) {
    animation = getSwapAnimation(originalOrder - order, interval);
  }

  return (
    <Cell
      animation={animation}
      order={order}
      value={value}
      isHighlighted={isHighlighted}
    />
  );
}

export default MovingCell;
