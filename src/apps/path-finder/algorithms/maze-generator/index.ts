import { generateMazeRandomly } from './random';
import { generateMazeUsingPrims } from './prims';

export const mazeGenerators = new Map([
  ['prims', { name: 'Prims', fn: generateMazeUsingPrims }],
  ['random', { name: 'Random', fn: generateMazeRandomly }],
]);
