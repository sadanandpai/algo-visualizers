import { aStar } from './a-star';
import { breadthFirstSearch } from './bfs';
import { depthFirstSearch } from './dfs';
import { greedy } from './greedy';

export const pathFinders = new Map([
  ['bfs', { name: 'BFS', fn: breadthFirstSearch }],
  ['dfs', { name: 'DFS', fn: depthFirstSearch }],
  ['a-star', { name: 'A*', fn: aStar }],
  ['greedy', { name: 'Greedy', fn: greedy }],
]);
