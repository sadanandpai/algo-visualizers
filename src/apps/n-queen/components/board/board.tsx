import { useAppSelector } from '@/host/store/hooks';
import Cell from '@nQueen/components/cell/cell';
import styles from './board.module.scss';

function Board() {
  const board = useAppSelector((state) => state.nQueen.board);

  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={`${rowIndex}`} className={styles.row}>
          {row.map((value, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              value={value}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
