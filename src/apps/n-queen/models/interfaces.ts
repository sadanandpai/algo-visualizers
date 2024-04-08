import { ChessBoard } from './types';

export interface AppState {
  size: number;
  board: ChessBoard;
}

export interface CellProps {
  rowIndex: number;
  colIndex: number;
  value: boolean;
}
