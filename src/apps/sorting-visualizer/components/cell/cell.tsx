import { CellProps } from '@/apps/sorting-visualizer/models/interfaces';
import classes from './cell.module.scss';

function Cell({
  order,
  animation,
  value,
  isSorted = false,
  isHighlighted = false,
  isPivot = false,
}: CellProps) {
  let cellClass = '';

  if (isPivot) {
    cellClass = 'pivot';
  }

  if (isSorted) {
    cellClass = 'sort';
  }

  if (isHighlighted) {
    cellClass = 'highlight';
  }

  return (
    <li
      className={`${classes.cell} ${classes[cellClass]}`}
      style={{
        animation,
        order,
      }}
    >
      {value}
    </li>
  );
}

export default Cell;
