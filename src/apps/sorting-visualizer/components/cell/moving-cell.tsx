import {
  getMovingAnimation,
  getSwapAnimation,
} from '@sortViz/helpers/key-frames-helpers';

import Cell from '@sortViz/components/cell/cell';
import { MovingCellProps } from '@sortViz/models/interfaces';
import { swapInterval } from '@sortViz/store/global.state';

function MovingCell({
  originalOrder,
  isSwap,
  order,
  value,
  isHighlighted,
}: MovingCellProps) {
  let animation = getMovingAnimation(originalOrder - order, swapInterval);

  if (isSwap) {
    animation = getSwapAnimation(originalOrder - order, swapInterval);
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
