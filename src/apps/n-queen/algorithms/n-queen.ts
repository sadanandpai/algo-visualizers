import { ChessBoard } from '@nQueen/models/types';

export function hasQueenInLeftDiagonal(
  board: ChessBoard,
  row: number,
  col: number
) {
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j]) {
      return true;
    }
  }
  return false;
}

export function hasQueenInRightDiagonal(
  board: ChessBoard,
  row: number,
  col: number
) {
  const size = board.length;
  for (let i = row - 1, j = col + 1; i >= 0 && j < size; i--, j++) {
    if (board[i][j]) {
      return true;
    }
  }
  return false;
}

export function isValidQueenPosition(
  board: ChessBoard,
  row: number,
  col: number
) {
  return (
    !hasQueenInLeftDiagonal(board, row, col) &&
    !hasQueenInRightDiagonal(board, row, col)
  );
}

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
      isValidQueenPosition(board, row, col) &&
      nQueen(board, row + 1, filledColumns)
    ) {
      return true;
    }

    filledColumns[col] = false;
    board[row][col] = false;
  }

  return false;
}
