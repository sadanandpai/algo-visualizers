import {
  getMovingAnimation,
  getSwapAnimation,
} from "@/apps/sorting-visualizer/helpers/key-frames-helpers";

import Cell from "@/apps/sorting-visualizer/components/array/cell";
import { MovingCellProps } from "@/apps/sorting-visualizer/models/interfaces";
import { animationInterval } from "@/apps/sorting-visualizer/store/global.state";

function MovingCell({
  originalOrder,
  isSwap,
  order,
  value,
  isHighlighted,
}: MovingCellProps) {
  let animation = getMovingAnimation(originalOrder - order, animationInterval);

  if (isSwap) {
    animation = getSwapAnimation(originalOrder - order, animationInterval);
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
