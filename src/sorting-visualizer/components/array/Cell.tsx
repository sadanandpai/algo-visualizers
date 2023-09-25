import { CellProps } from "@/sorting-visualizer/models/interfaces";
import classes from "./array.module.scss";

function Cell({
  order,
  animation,
  value,
  isSorted = false,
  isHighlighted = false,
  isPivot = false,
}: CellProps) {
  const backgroundColor = isSorted
    ? "springgreen"
    : isHighlighted
    ? "yellow"
    : isPivot
    ? "orange"
    : "";

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
