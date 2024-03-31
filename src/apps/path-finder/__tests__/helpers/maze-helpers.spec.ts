import {
  filterByCellType,
  filterValidCells,
  getNeighbors,
  getRandomEvenNumber,
  getRandomOddNumber,
} from '@pathFinder/helpers/maze.helper';
import { CellType } from '@pathFinder/models/enum';

const [clear, wall] = [CellType.clear, CellType.wall];
const grid = [
  [clear, clear, wall, clear, clear],
  [clear, clear, clear, clear, clear],
  [clear, clear, clear, clear, wall],
  [clear, clear, clear, clear, clear],
  [clear, clear, clear, clear, clear],
];

describe('Maze helpers', () => {
  it('getNeighbors', () => {
    const neighborsWithWalls = getNeighbors({
      row: 2,
      col: 2,
    });
    expect(neighborsWithWalls).toMatchInlineSnapshot(`
      [
        {
          "col": 2,
          "row": 0,
        },
        {
          "col": 2,
          "row": 4,
        },
        {
          "col": 0,
          "row": 2,
        },
        {
          "col": 4,
          "row": 2,
        },
      ]
    `);

    const neighborsWithClear = getNeighbors({
      row: 1,
      col: 5,
    });
    expect(neighborsWithClear).toMatchInlineSnapshot(`
      [
        {
          "col": 5,
          "row": -1,
        },
        {
          "col": 5,
          "row": 3,
        },
        {
          "col": 3,
          "row": 1,
        },
        {
          "col": 7,
          "row": 1,
        },
      ]
    `);
  });

  it('getNeighborsWithDirections', () => {
    const neighborsWithWalls = getNeighbors({
      row: 2,
      col: 2,
    });
    expect(neighborsWithWalls).toMatchInlineSnapshot(`
      [
        {
          "col": 2,
          "row": 0,
        },
        {
          "col": 2,
          "row": 4,
        },
        {
          "col": 0,
          "row": 2,
        },
        {
          "col": 4,
          "row": 2,
        },
      ]
    `);

    const neighborsWithClear = getNeighbors({
      row: 1,
      col: 5,
    });
    expect(neighborsWithClear).toMatchInlineSnapshot(`
      [
        {
          "col": 5,
          "row": -1,
        },
        {
          "col": 5,
          "row": 3,
        },
        {
          "col": 3,
          "row": 1,
        },
        {
          "col": 7,
          "row": 1,
        },
      ]
    `);
  });

  it('filterValidCells with only valid cells', () => {
    const validCells = [
      { row: 2, col: 2 },
      { row: 2, col: 4 },
      { row: 4, col: 2 },
      { row: 4, col: 4 },
    ];
    const filteredCells = filterValidCells(validCells, 5, 5);
    expect(filteredCells).toMatchInlineSnapshot(`
      [
        {
          "col": 2,
          "row": 2,
        },
        {
          "col": 4,
          "row": 2,
        },
        {
          "col": 2,
          "row": 4,
        },
        {
          "col": 4,
          "row": 4,
        },
      ]
    `);
  });

  it('filterValidCells with invalid cells', () => {
    const validCells = [
      { row: -2, col: 2 },
      { row: 1, col: -1 },
      { row: -2, col: -2 },
      { row: 2, col: 4 },
    ];
    const filteredCells = filterValidCells(validCells, 5, 5);
    expect(filteredCells).toMatchInlineSnapshot(`
      [
        {
          "col": 4,
          "row": 2,
        },
      ]
    `);
  });

  it('filterByCellType', () => {
    const filteredWalls = filterByCellType(
      [
        { row: 0, col: 2 },
        { row: 2, col: 4 },
        { row: 4, col: 2 },
        { row: 2, col: 0 },
      ],
      grid,
      wall
    );
    expect(filteredWalls).toMatchInlineSnapshot(`
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

    const filteredClears = filterByCellType(
      [
        { row: 0, col: 2 },
        { row: 2, col: 4 },
        { row: 4, col: 2 },
        { row: 2, col: 0 },
      ],
      grid,
      wall
    );
    expect(filteredClears).toMatchInlineSnapshot(`
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
  });

  it('filterByCellType with no cell', () => {
    const filteredWalls = filterByCellType([], grid, wall);
    expect(filteredWalls).toMatchInlineSnapshot(`[]`);
  });

  it('getRandomEvenNumber', () => {
    for (let i = 0; i < 100; i++) {
      const min = Math.floor(Math.random() * 20);
      const max = min + Math.floor(Math.random() * 20) + 1;
      const number = getRandomEvenNumber(min, max);
      expect(number).toBeGreaterThanOrEqual(min);
      expect(number).toBeLessThanOrEqual(max);
      expect(number % 2).toBe(0);
    }
  });

  it('getRadomOddNumber', () => {
    for (let i = 0; i < 100; i++) {
      const min = Math.floor(Math.random() * 20);
      const max = min + Math.floor(Math.random() * 20) + 1;
      const number = getRandomOddNumber(min, max);
      expect(number).toBeGreaterThanOrEqual(min);
      expect(number).toBeLessThanOrEqual(max);
      expect(number % 2).toBe(1);
    }
  });
});
