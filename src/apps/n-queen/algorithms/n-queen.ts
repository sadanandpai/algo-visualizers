import { ChessBoard } from '../models/types';

export function initChessBoard(queens: number): ChessBoard {
  return Array.from({ length: queens }, () => Array(queens).fill(false));
}

function checkColumn(board: ChessBoard, row: number, col: number): boolean {
  for (let i = row - 1; i >= 0; i--) {
    if (board[i][col]) {
      return false;
    }
  }
  return true;
}

function checkLeftDiagonal(
  board: ChessBoard,
  row: number,
  col: number
): boolean {
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j]) {
      return false;
    }
  }
  return true;
}

function checkRightDiagonal(
  board: ChessBoard,
  row: number,
  col: number
): boolean {
  const size = board.length;
  for (let i = row - 1, j = col + 1; i >= 0 && j < size; i--, j++) {
    if (board[i][j]) {
      return false;
    }
  }
  return true;
}

function isValidQueen(board: ChessBoard, row: number, col: number): boolean {
  return (
    checkColumn(board, row, col) &&
    checkLeftDiagonal(board, row, col) &&
    checkRightDiagonal(board, row, col)
  );
}

export function nQueen(board: ChessBoard, row: number) {
  if (row >= board.length) {
    return true;
  }

  for (let col = 0; col < board.length; col++) {
    board[row][col] = true;
    if (isValidQueen(board, row, col) && nQueen(board, row + 1)) {
      return true;
    }
    board[row][col] = false;
  }

  return false;
}
