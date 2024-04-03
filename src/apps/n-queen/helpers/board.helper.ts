import { ChessBoard } from '@nQueen/models/types';

export function initChessBoard(queens: number): ChessBoard {
  return Array.from({ length: queens }, () => Array(queens).fill(false));
}
