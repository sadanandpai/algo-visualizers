export const mazeAlgoInfo = [
  {
    id: 1,
    heading: "Prim's Algorithm",
    content: `
          Prim's algorithm is a greedy algorithm & works on spanning tree generation technique. 
          It creates the maze by starting with a random cell and adding the nearest cell to the current set of cells.
  `,
  },
  {
    id: 2,
    heading: "Kruskal's Algorithm",
    content: `
          Kruskal's algorithm is a greedy algorithm & works on spanning tree generation technique. 
          It creates the maze by choosing random edges to connect in the entire grid provided that adding the edge does not create a cycle.
        `,
  },
  {
    id: 3,
    heading: 'Recursive backtracking',
    content: `        
          Recursive backtracking is a technique commonly used to generate mazes. 
          It works by recursively exploring the grid and backtracking when a dead end is reached. 
          This technique often results in mazes with long, winding corridors and a single path from the start to the finish.
        `,
  },
  {
    id: 4,
    heading: 'Recursive division',
    content: `        
          Recursive division is a technique commonly used to generate mazes. 
          It works by recursively dividing a region into smaller subregions until certain criteria are met. 
          This method results in mazes with long straight walls crossing their space, making it easier to see which areas to avoid.',
        `,
  },
  {
    id: 5,
    heading: 'Wilson algorithm',
    content: `
          Wilson's algorithm is a random maze generation algorithm.
          It creates the maze by performing a random walk until it reaches a cell that has already been visited. 
          Then, it backtracks and adds the path to the visited cells.
        `,
  },
  {
    id: 6,
    heading: 'Binary tree algorithm',
    content: `
          The binary tree algorithm is a simple method for generating mazes. 
          It works by dividing the grid into two halves and connecting cells in each half to create a maze. 
          This method results in mazes with corridors that are either vertical or horizontal, depending on the orientation of the grid.
        `,
  },
  {
    id: 7,
    heading: ' Ellers Algorithm',
    content: `      
          Eller's algorithm works by iteratively generating one row of the maze at a time, which makes it particularly efficient in terms of memory usage. 
          It's also notable for its ability to generate mazes with horizontal passages that span the entire width of the maze.
        `,
  },
  {
    id: 8,
    heading: 'Sidewinder Algorithm',
    content: `
          The Sidewinder algorithm is a relatively simple and efficient for generating mazes.
          It is named after the sidewinder snake due to the pattern it creates in the maze.
          The algorithm primarily works by carving passages either horizontally or vertically, resulting in a maze with a strong bias towards corridors that are mostly horizontal or mostly vertic`,
  },
  {
    id: 9,
    heading: 'Labyrinth Algorithm',
    content: `
          The Labyrinth algorithm is a maze generation algorithm that works by creating a grid of cells and carving passages between them.
          It is a simple and efficient algorithm that can generate mazes of varying complexity.
        `,
  },
  {
    id: 10,
    heading: 'Random Algorithm',
    content: `
          The Random algorithm is a simple maze generation algorithm that works by randomly placing the walls in the grid.
          It is a quick and easy way to generate mazes of varying complexity. It does not guarantee that the maze will be solvable.
        `,
  },
];

export const pathSearchAlgoInfo = [
  {
    id: 1,
    heading: 'Breadth-First Search (BFS)',
    content: `
        Breadth-first search (BFS) algorithm that finds the shortest path between cells in a grid.
        It is an uninformed search algorithm that explores all the neighbor cells at the present depth prior to moving on to the cells at the next depth level.
        This algorithm uses a queue data structure to keep track of cells to be explored.
      `,
  },
  {
    id: 2,
    heading: 'Depth-First Search (DFS)',
    content: `
        Depth-first search (DFS) algorithm that finds a path between cells in a grid but does not gaurantee the shortest path. 
        It is an uninformed search algorithm that explores as far as possible along each branch before backtracking.
        It uses a stack data structure to keep track of cells to be explored.
      `,
  },
  {
    id: 3,
    heading: 'A* Search',
    content: `
        A* search is an informed search algorithm that finds the shortest path between cells in a graph.
        It evaluates cells by combining the cost to reach the cell with the estimated cost to reach the goal.
        A* uses a heuristic function to estimate the cost to reach the goal from a given cell.
      `,
  },
  {
    id: 4,
    heading: 'Greedy Best-First Search',
    content: `
        Greedy best-first search is an informed search algorithm that finds a path between cells in a grid but does not gaurantee the shortest path.
        It prioritizes cells based solely on the estimated cost to reach the goal from the current cell.
      `,
  },
];
