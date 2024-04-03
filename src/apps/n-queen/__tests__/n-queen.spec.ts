import {
  hasQueenInLeftDiagonal,
  getCandidates,
  nQueen,
  hasQueenInRightDiagonal,
  isValidQueenPosition,
} from '@nQueen/algorithms/n-queen';

describe('N-Queen', () => {
  it('should return a valid solution for 4x4 board', () => {
    const board = Array.from(Array(4)).map(() => Array(4).fill(false));
    const result = nQueen(board, 0);
    expect(result).toBe(true);
    expect(board).toMatchInlineSnapshot(`
      [
        [
          false,
          true,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          true,
        ],
        [
          true,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          true,
          false,
        ],
      ]
    `);
  });

  it('should return a valid solution for 8x8 board', () => {
    const board = Array.from(Array(8)).map(() => Array(8).fill(false));
    const result = nQueen(board, 0);
    expect(result).toBe(true);
    expect(board).toMatchInlineSnapshot(`
      [
        [
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
        ],
        [
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
        ],
        [
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
        ],
      ]
    `);
  });
});

describe('N-Queen getCandidates', () => {
  it('should return an array of candidates', () => {
    const result = getCandidates([true, false, true, false]);
    expect(result).toEqual([1, 3]);
  });

  it('should return an empty array if there is no candidate', () => {
    const result = getCandidates([true, true, true, true]);
    expect(result).toEqual([]);
  });

  it('should return complete array if there are full candidates', () => {
    const result = getCandidates([false, false, false, false]);
    expect(result).toEqual([0, 1, 2, 3]);
  });
});

describe('N-Queen isQueenInDiagonal', () => {
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

describe('N-Queen isValidQueenPosition', () => {
  it('should return true if the position is valid', () => {
    const board = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    const result = isValidQueenPosition(board, 2, 2);
    expect(result).toBe(true);
  });

  it('should return false if the position is invalid', () => {
    const board = [
      [true, false, true],
      [false, false, false],
      [false, false, false],
    ];
    const result = isValidQueenPosition(board, 1, 1);
    expect(result).toBe(false);
  });
});
