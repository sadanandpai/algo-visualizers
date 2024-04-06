import {
  hasQueenInDiagonals,
  hasQueenInLeftDiagonal,
  hasQueenInRightDiagonal,
} from '@nQueen/helpers/board.helper';

describe('boardHelper: isQueenInDiagonal', () => {
  it('should return true if there is no queen in the left diagonal', () => {
    const board = [
      [false, true, true],
      [false, false, false],
      [true, true, false],
    ];
    const result = hasQueenInLeftDiagonal(board, 2, 2);
    expect(result).toBe(false);
  });

  it('should return false if there is a queen in the left diagonal', () => {
    const board = [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ];
    const result = hasQueenInLeftDiagonal(board, 2, 2);
    expect(result).toBe(true);
  });

  it('should return true if there is no queen in the corner left diagonal', () => {
    const board = [
      [true, false, false],
      [false, false, false],
      [false, false, false],
    ];
    const result = hasQueenInLeftDiagonal(board, 2, 2);
    expect(result).toBe(true);
  });

  it('should return true if there is no queen in the right diagonal', () => {
    const board = [
      [true, false, false],
      [false, false, false],
      [false, false, false],
    ];
    const result = hasQueenInRightDiagonal(board, 2, 0);
    expect(result).toBe(false);
  });

  it('should return false if there is a queen in the right diagonal', () => {
    const board = [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ];
    const result = hasQueenInRightDiagonal(board, 2, 0);
    expect(result).toBe(true);
  });

  it('should return true if there is no queen in the corner right diagonal', () => {
    const board = [
      [false, false, true],
      [false, false, false],
      [false, false, false],
    ];
    const result = hasQueenInRightDiagonal(board, 2, 0);
    expect(result).toBe(true);
  });
});

describe('boardHelper: hasQueenInDiagonals', () => {
  it('should return true if the position is valid', () => {
    const board = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    const result = hasQueenInDiagonals(board, 2, 2);
    expect(result).toBe(false);
  });

  it('should return false if the position is invalid', () => {
    const board = [
      [true, false, true],
      [false, false, false],
      [false, false, false],
    ];
    const result = hasQueenInDiagonals(board, 1, 1);
    expect(result).toBe(true);
  });
});
