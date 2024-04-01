import { ChessBoard } from '../models/types';

const queen = 1;
export function initChessBoard(queens: number): ChessBoard {
  const board: ChessBoard = [];
  for (let i = 0; i < queens; i++) {
    const row = [];
    for (let j = 0; j < queens; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}

function checkColumn(board: ChessBoard, row: number, col: number): boolean {
  for (let i = row; i >= 0; i--) {
    if (board[i][col] === queen) return false;
  }
  return true;
}

function checkLeftDiagonal(
  board: ChessBoard,
  row: number,
  col: number
): boolean {
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === queen) return false;
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
    if (board[i][j] === queen) return false;
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

export async function nQueen(board: ChessBoard, row: number) {
  const size = board.length;

  if (row >= size) return true;

  for (let col = 0; col < size; col++) {
    if (isValidQueen(board, row, col)) {
      board[row][col] = queen;

      if (!nQueen(board, row + 1)) board[row][col] = 0;

      return true;
    }
  }
  return false;
}
