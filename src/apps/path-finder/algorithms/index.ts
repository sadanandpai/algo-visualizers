// Maze generators
import { generateRandomMaze } from '@pathFinder/algorithms/maze-generator/random';
import { generatePrimsMaze } from '@pathFinder/algorithms/maze-generator/prims';
import { generateRecursiveDivisionMaze } from '@pathFinder/algorithms/maze-generator/recursive-division';
import { generateRecursiveBacktrackingMaze } from '@pathFinder/algorithms/maze-generator/recursive-backtracking';
import { generateBinaryMaze } from '@pathFinder/algorithms/maze-generator/binary';
import { generateKruskalMaze } from '@pathFinder/algorithms/maze-generator/kruskal';
import { generateSideWinderMaze } from '@pathFinder/algorithms/maze-generator/side-winder';
import { generateWilsonMaze } from '@pathFinder/algorithms/maze-generator/wilson';

// Path finders
import { aStar } from '@pathFinder/algorithms/path-finder/a-star';
import { breadthFirstSearch } from '@pathFinder/algorithms/path-finder/bfs';
import { depthFirstSearch } from '@pathFinder/algorithms/path-finder/dfs';
import { greedy } from '@pathFinder/algorithms/path-finder/greedy';

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
