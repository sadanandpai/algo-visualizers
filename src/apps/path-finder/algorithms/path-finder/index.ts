import { startBFSAlgo } from './bfs';
import { startDFSAlgo } from './dfs';

export const pathFinders = new Map([
  ['bfs', { name: 'BFS', fn: startBFSAlgo }],
  ['dfs', { name: 'DFS', fn: startDFSAlgo }],
]);
