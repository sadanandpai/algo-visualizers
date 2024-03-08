import { generateMazeRandomly } from './random';
import { generatePrimsMaze } from './prims';
import { generateRecursiveDivisionMaze } from './recursive-division';

export const mazeGenerators = new Map([
  ['prims', { name: 'Prims', fn: generatePrimsMaze }],
  ['recursiveDivision', { name: 'Rec Div', fn: generateRecursiveDivisionMaze }],
  ['random', { name: 'Random', fn: generateMazeRandomly }],
]);
