import { getNeighbors } from '@pathFinder/algorithms/maze-generator/prims';
import { CellType } from '@pathFinder/models/interfaces';

describe('Prims maze helpers', () => {
  it('getNeighbors', () => {
    const [clear, wall] = [CellType.clear, CellType.wall];
    const grid = [
      [clear, clear, wall, clear, clear],
      [clear, clear, clear, clear, clear],
      [clear, clear, clear, clear, wall],
      [clear, clear, clear, clear, clear],
      [clear, clear, clear, clear, clear],
    ];

    const neighborsWithWalls = getNeighbors(
      grid,
      {
        row: 2,
        col: 2,
      },
      wall
    );
    expect(neighborsWithWalls).toMatchInlineSnapshot(`
      [
        {
          "col": 2,
          "row": 0,
        },
        {
          "col": 4,
          "row": 2,
        },
      ]
    `);

    const neighborsWithClear = getNeighbors(
      grid,
      {
        row: 2,
        col: 2,
      },
      clear
    );
    expect(neighborsWithClear).toMatchInlineSnapshot(`
      [
        {
          "col": 2,
          "row": 4,
        },
        {
          "col": 0,
          "row": 2,
        },
      ]
    `);
  });
});
