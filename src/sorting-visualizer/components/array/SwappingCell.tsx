import Cell from "@/sorting-visualizer/components/array/Cell";
import { MovingCellProps } from "@/sorting-visualizer/models/interfaces";
import { getSwapAnimation } from "@/sorting-visualizer/helpers/keyFrames";
import { interval } from "@/sorting-visualizer/store/global";

function SwappingCell({
  originalOrder,
  order,
  value,
  isHighlighted,
}: MovingCellProps) {
  const animation = getSwapAnimation(originalOrder - order, interval);

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
