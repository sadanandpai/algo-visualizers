import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { updateBoard } from '@nQueen/store/n-queen.slice';
import styles from './board.module.scss';

function Board() {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.nQueen.board);

  function onCellClick(e: React.MouseEvent<HTMLButtonElement>) {
    const { row, col } = e.currentTarget.dataset;
    if (!row || !col) {
      return;
    }
    dispatch(updateBoard({ row: parseInt(row), col: parseInt(col) }));
  }

  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={`${rowIndex}`} className={styles.row}>
          {row.map((value, colIndex) => (
            <button
              className={`${styles.cell} ${
                (rowIndex + colIndex) % 2 === 0
                  ? styles.evenCell
                  : styles.oddCell
              }`}
              data-value={value}
              data-row={rowIndex}
              data-col={colIndex}
              key={`${rowIndex}-${colIndex}`}
              onClick={onCellClick}
            ></button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
