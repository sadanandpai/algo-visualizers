import { aStar } from './a-star';
import { breadthFirstSearch } from './bfs';
import { depthFirstSearch } from './dfs';
import { greedy } from './greedy';

export const pathFinders = new Map([
  [
    'bfs',
    { name: 'BFS', fullName: 'Breadth First Search', fn: breadthFirstSearch },
  ],
  [
    'dfs',
    { name: 'DFS', fullName: 'Depth First Search', fn: depthFirstSearch },
  ],
  ['a-star', { name: 'A*', fullName: 'A* Search', fn: aStar }],
  ['greedy', { name: 'Greedy', fullName: 'Greedy Best First', fn: greedy }],
]);
