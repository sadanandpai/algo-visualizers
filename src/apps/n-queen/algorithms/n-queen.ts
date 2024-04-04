import { ChessBoard } from '@nQueen/models/types';
import { hasQueenInDiagonals } from '@nQueen/helpers/board.helper';

export function getCandidates(array: boolean[]) {
  const candidates = [];
  for (let i = 0; i < array.length; i++) {
    if (!array[i]) {
      candidates.push(i);
    }
  }

  return candidates;
}

export function nQueen(
  board: ChessBoard,
  row: number,
  filledColumns = Array(board.length).fill(false)
) {
  if (row >= board.length) {
    return true;
  }

  const candidates = getCandidates(filledColumns);
  for (const col of candidates) {
    board[row][col] = true;
    filledColumns[col] = true;

    if (
      !hasQueenInDiagonals(board, row, col) &&
      nQueen(board, row + 1, filledColumns)
    ) {
      return true;
    }

    filledColumns[col] = false;
    board[row][col] = false;
  }

  return false;
}
