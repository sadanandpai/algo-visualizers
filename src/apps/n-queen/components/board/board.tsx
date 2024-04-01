import { useState } from 'react';
import { initChessBoard, nQueen } from '../../algorithms/n-queen';
import { ChessBoard } from '../../models/types';
import styles from './board.module.scss';
import playIcon from '/icons/play.svg';
import resetIcon from '/icons/reset.svg';

const Board = () => {
  const [board, setBoard] = useState<ChessBoard>([[]]);
  const [queen, setQueen] = useState<number>(0);
  const [speed, setSpeed] = useState<string | number>();

  const handleSetQueen = (value: string) => {
    setQueen(parseInt(value));
    setBoard(initChessBoard(parseInt(value)));
  };
  const handleQueenPlacement = () => {
    setBoard(initChessBoard(queen));
    nQueen(board, 0);
  };

  return (
    <div>
      <section className={styles.header}>
        <input
          className="input-queen"
          type="number"
          placeholder="Enter the number of queens."
          min="1"
          max="8"
          value={queen}
          onChange={(e) => handleSetQueen(e.target.value)}
        />
        <img
          onClick={handleQueenPlacement}
          src={playIcon}
          alt="Play"
          height={24}
          width={24}
        />
        <img src={resetIcon} height={24} width={24} />

        <input
          type="range"
          id="speed"
          data-tooltip="Animation speed"
          onChange={(e) => setSpeed(e.target.value)}
          min={1}
          max={20}
          value={speed}
          step={1}
        />
      </section>

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
};

export default Board;
