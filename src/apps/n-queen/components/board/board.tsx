import Controller from '@nQueen/components/controller/controller';
import styles from './board.module.scss';
import { useAppSelector } from '@/host/store/hooks';

function Board() {
  const size = useAppSelector((state) => state.nQueen.size);

  return (
    <div>
      <Controller />

      <div className={styles.board}>
        {Array.from(Array(size)).map((_, rowIndex) => (
          <div key={`${rowIndex}`} className="flex text-center">
            {Array.from(Array(size)).map((_, colIndex) => (
              <div
                className="p-5 text-center w-16 h-16 border border-1-black"
                key={`${rowIndex}-${colIndex}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
