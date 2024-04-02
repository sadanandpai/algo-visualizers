import { initChessBoard, nQueen } from '@nQueen/algorithms/n-queen';
import { defaultSpeeds, speeds } from '@nQueen/config';
import { ChessBoard } from '@nQueen/models/types';
import { Play, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import styles from './controller.module.scss';

function Controller() {
  const defaultSpeed = defaultSpeeds.desktop;
  const [board, setBoard] = useState<ChessBoard>([[]]);
  const [queen, setQueen] = useState<number>(0);
  const [speed, setSpeed] = useState<string | number>(
    speeds.get(defaultSpeed) as number
  );

  function handleSpeed(e: React.ChangeEvent<HTMLSelectElement>) {
    setSpeed(e.target.value);
  }

  function handleSetQueen(e: React.ChangeEvent<HTMLInputElement>) {
    const totalQueens = e.target.value;
    setQueen(parseInt(totalQueens));
    setBoard(initChessBoard(parseInt(totalQueens)));
  }

  function handleQueenPlacement() {
    setBoard(initChessBoard(queen));
    nQueen(board, 0);
  }

  return (
    <section className={styles.controller}>
      <input
        className={styles.queenRange}
        type="range"
        min="1"
        max="8"
        value={queen}
        onChange={handleSetQueen}
      />
      <select
        className={styles.speed}
        data-tooltip="Animation speed"
        value={speed}
        id="speed"
        onChange={handleSpeed}
      >
        {[...speeds.entries()].map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>

      <button
        data-testid="player"
        // disabled={disabled || !pathFinder}
        data-tooltip="Play"
        // onClick={() => handlePlay()}
      >
        <Play size={20} />
      </button>
      <button
        data-testid="clear"
        // onClick={handleClear}
        // disabled={status === Status.Generating}
        data-tooltip="clear"
      >
        <RefreshCcw size={20} />
      </button>
    </section>
  );
}

export default Controller;
