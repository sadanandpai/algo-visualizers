import { generateMazeRandomly } from './random';
import { generatePrimsMaze } from './prims';
import { generateRecursiveDivisionMaze } from './recursive-division';
import { generateRecursiveBacktrackingMaze } from './recursive-backtracking';
import { generateBinaryMaze } from './binary';
import { generateKruskalMaze } from './kruskal';

export const mazeGenerators = new Map([
  ['prims', { name: 'Prims', fn: generatePrimsMaze }],
  ['recursiveDivision', { name: 'Rec Div', fn: generateRecursiveDivisionMaze }],
  [
    'recursiveBacktracking',
    { name: 'Rec Back', fn: generateRecursiveBacktrackingMaze },
  ],
  ['kruskal', { name: 'Kruskal', fn: generateKruskalMaze }],
  ['binary', { name: 'Binary', fn: generateBinaryMaze }],
  ['random', { name: 'Random', fn: generateMazeRandomly }],
]);
