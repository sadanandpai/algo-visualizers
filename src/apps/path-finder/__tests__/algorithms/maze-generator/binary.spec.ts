import { CellType } from '@pathFinder/models/enum';
import { getNeighbors } from '@pathFinder/algorithms/maze-generator/binary';

describe('Binary maze helpers', () => {
  it('getNeighbors', () => {
    const [clear, wall, entry, exit] = [
      CellType.clear,
      CellType.wall,
      CellType.entry,
      CellType.exit,
    ];
    const grid = [
      [clear, clear, wall, clear, clear],
      [clear, clear, clear, clear, clear],
      [entry, clear, clear, clear, wall],
      [clear, clear, clear, clear, clear],
      [clear, clear, exit, clear, clear],
    ];

    const neighbors = getNeighbors(grid, {
      row: 2,
      col: 2,
    });

    expect(neighbors).toMatchInlineSnapshot(`
      [
        {
          "col": 2,
          "row": 1,
        },
        {
          "col": 1,
          "row": 2,
        },
      ]
    `);
  });
});
