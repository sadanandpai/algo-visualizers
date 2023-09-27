import Cell from "@/apps/sorting-visualizer/components/array/cell";
import { MovingCellProps } from "@/apps/sorting-visualizer/models/interfaces";
import { animationInterval } from "@/apps/sorting-visualizer/store/global.state";
import { getSwapAnimation } from "@/apps/sorting-visualizer/helpers/key-frames-helpers";

function SwappingCell({
  originalOrder,
  order,
  value,
  isHighlighted,
}: MovingCellProps) {
  const animation = getSwapAnimation(originalOrder - order, animationInterval);

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
