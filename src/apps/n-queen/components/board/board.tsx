import { useAppSelector } from '@/host/store/hooks';
import styles from './board.module.scss';

function Board() {
  const board = useAppSelector((state) => state.nQueen.board);
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={`${rowIndex}`} className="flex text-center">
          {row.map((value, colIndex) => (
            <button
              className="p-5 text-center w-16 h-16 border border-1-black"
              data-value={value}
              key={`${rowIndex}-${colIndex}`}
            ></button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
