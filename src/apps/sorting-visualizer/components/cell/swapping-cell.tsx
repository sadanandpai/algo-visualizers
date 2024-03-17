import Cell from '@sortViz/components/cell/cell';
import { MovingCellProps } from '@sortViz/models/interfaces';
import { getSwapAnimation } from '@sortViz/helpers/key-frames-helpers';
import { swapInterval } from '@sortViz/store/global.state';

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
