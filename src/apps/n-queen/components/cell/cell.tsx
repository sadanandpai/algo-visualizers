import styles from '@nQueen/components/cell/cell.module.scss';
import { CellProps } from '@nQueen/models/interfaces';
import { updateBoard } from '@nQueen/store/n-queen.slice';
import { useDispatch } from 'react-redux';

function Cell({ rowIndex, colIndex, value }: CellProps) {
  const dispatch = useDispatch();

  const highlight = 'highlight';
  function onCellClick(e: React.MouseEvent<HTMLButtonElement>) {
    const { row, col } = e.currentTarget.dataset;
    if (!row || !col) {
      return;
    }
    dispatch(updateBoard({ row: parseInt(row), col: parseInt(col) }));
  }

  return (
    <button
      className={`${styles.cell} ${
        (rowIndex + colIndex) % 2 === 0 ? styles.evenCell : styles.oddCell
      } ${highlight}`}
      data-value={value}
      data-row={rowIndex}
      data-col={colIndex}
      key={`${rowIndex}-${colIndex}`}
      onClick={onCellClick}
    ></button>
  );
}

export default Cell;
