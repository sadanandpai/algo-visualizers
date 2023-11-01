import { generateMazeRandomly } from './random';
import { generateMazeUsingPrims } from './prims';
import { generateMazeUsingRecursiveDivision } from './recursive-division';

export const mazeGenerators = new Map([
  ['prims', { name: 'Prims', fn: generateMazeUsingPrims }],
  [
    'recursiveDivision',
    { name: 'Rec Div', fn: generateMazeUsingRecursiveDivision },
  ],
  ['random', { name: 'Random', fn: generateMazeRandomly }],
]);
