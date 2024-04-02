import Controller from '@nQueen/components/controller/controller';
import styles from './board.module.scss';

function Board() {
  const queen = 4;
  return (
    <div>
      <Controller />

      <div className={styles.board}>
        {Array.from(Array(queen)).map((_, rowIndex) => (
          <div key={`${rowIndex}`} className="flex text-center">
            {Array.from(Array(queen)).map((_, colIndex) => (
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
