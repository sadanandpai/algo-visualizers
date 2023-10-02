import Cell from '@/apps/sorting-visualizer/components/cell/cell';
import { MovingCellProps } from '@/apps/sorting-visualizer/models/interfaces';
import { getSwapAnimation } from '@/apps/sorting-visualizer/helpers/key-frames-helpers';
import { swapInterval } from '@/apps/sorting-visualizer/store/global.state';

function SwappingCell({
  originalOrder,
  order,
  value,
  isHighlighted,
}: MovingCellProps) {
  const animation = getSwapAnimation(originalOrder - order, swapInterval);

  return (
    <Cell
      animation={animation}
      order={order}
      value={value}
      isHighlighted={isHighlighted}
    />
  );
}

export default SwappingCell;
