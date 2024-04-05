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
  filledRows = Array(board.length).fill(false),
  filledColumns = Array(board.length).fill(false)
) {
  if (filledRows.every((row) => row)) {
    return true;
  }

  const row = getCandidates(filledRows)[0];
  filledRows[row] = true;
  const colCandidates = getCandidates(filledColumns);
  for (const col of colCandidates) {
    board[row][col] = true;
    filledColumns[col] = true;

    if (
      !hasQueenInDiagonals(board, row, col) &&
      nQueen(board, filledRows, filledColumns)
    ) {
      return true;
    }

    filledColumns[col] = false;
    board[row][col] = false;
  }

  filledRows[row] = false;
  return false;
}
