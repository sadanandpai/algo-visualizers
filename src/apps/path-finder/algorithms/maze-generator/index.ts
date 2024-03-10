import { generateMazeRandomly } from './random';
import { generatePrimsMaze } from './prims';
import { generateRecursiveDivisionMaze } from './recursive-division';
import { generateRecursiveBacktrackingMaze } from './recursive-backtracking';
import { generateBinaryMaze } from './binary';
import { generateKruskalMaze } from './kruskal';

export const mazeGenerators = new Map([
  ['prims', { name: 'Prims', fn: generatePrimsMaze }],
  ['kruskal', { name: 'Kruskal', fn: generateKruskalMaze }],
  [
    'recursiveBacktracking',
    { name: 'Rec Back', fn: generateRecursiveBacktrackingMaze },
  ],
  ['recursiveDivision', { name: 'Rec Div', fn: generateRecursiveDivisionMaze }],
  ['binary', { name: 'Binary', fn: generateBinaryMaze }],
  ['random', { name: 'Random', fn: generateMazeRandomly }],
]);
