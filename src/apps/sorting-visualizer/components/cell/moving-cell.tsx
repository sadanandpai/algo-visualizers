import {
  getMovingAnimation,
  getSwapAnimation,
} from '@/apps/sorting-visualizer/helpers/key-frames-helpers';

import Cell from '@/apps/sorting-visualizer/components/cell/cell';
import { MovingCellProps } from '@/apps/sorting-visualizer/models/interfaces';
import { swapInterval } from '@/apps/sorting-visualizer/store/global.state';

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
