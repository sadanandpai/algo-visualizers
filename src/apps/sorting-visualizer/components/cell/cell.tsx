import { CellProps } from "@/apps/sorting-visualizer/models/interfaces";
import classes from "./cell.module.scss";
import { colors } from "@/apps/sorting-visualizer/config";

function Cell({
  order,
  animation,
  value,
  isSorted = false,
  isHighlighted = false,
  isPivot = false,
}: CellProps) {
  let backgroundColor = "";

  if (isPivot) {
    backgroundColor = colors.pivot;
  }

  if (isHighlighted) {
    backgroundColor = colors.highlight;
  }

  if (isSorted) {
    backgroundColor = colors.sort;
  }

  return (
    <li
      className={classes.cell}
      style={{
        animation,
        order,
        backgroundColor,
      }}
    >
      {value}
    </li>
  );
}

export default Cell;
