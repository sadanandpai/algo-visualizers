// Maze generators
import { generateRandomMaze } from './maze-generator/random';
import { generatePrimsMaze } from './maze-generator/prims';
import { generateRecursiveDivisionMaze } from './maze-generator/recursive-division';
import { generateRecursiveBacktrackingMaze } from './maze-generator/recursive-backtracking';
import { generateBinaryMaze } from './maze-generator/binary';
import { generateKruskalMaze } from './maze-generator/kruskal';
import { generateSideWinderMaze } from './maze-generator/side-winder';
import { generateWilsonMaze } from './maze-generator/wilson';

// Path finders
import { aStar } from './path-finder/a-star';
import { breadthFirstSearch } from './path-finder/bfs';
import { depthFirstSearch } from './path-finder/dfs';
import { greedy } from './path-finder/greedy';

export const pathFinders = new Map([
  ['bfs', { name: 'Breadth First Search', fn: breadthFirstSearch }],
  ['dfs', { name: 'Depth First Search', fn: depthFirstSearch }],
  ['a-star', { name: 'A* Search', fn: aStar }],
  ['greedy', { name: 'Greedy Best First', fn: greedy }],
]);

export const mazeGenerators = new Map([
  ['prims', { name: 'Prims', fn: generatePrimsMaze }],
  ['kruskal', { name: 'Kruskal', fn: generateKruskalMaze }],
  [
    'recursiveBacktracking',
    { name: 'Recursive Backtracking', fn: generateRecursiveBacktrackingMaze },
  ],
  [
    'recursiveDivision',
    { name: 'Recursive Division', fn: generateRecursiveDivisionMaze },
  ],
  ['wilson', { name: 'Wilson', fn: generateWilsonMaze }],
  ['binary', { name: 'Binary', fn: generateBinaryMaze }],
  ['sideWinder', { name: 'Side Winder', fn: generateSideWinderMaze }],
  ['random', { name: 'Random', fn: generateRandomMaze }],
]);
