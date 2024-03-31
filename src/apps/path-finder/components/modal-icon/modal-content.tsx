export const modelContent1 = [
  {
    id: 1,
    heading: "Prim's Algorithm",
    content: `
    Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.
    The algorithm starts from an arbitrary vertex and grows the minimum spanning tree one edge at a time, always choosing the cheapest edge that connects a vertex in the tree to a vertex outside the tree.
    It continues this process until all vertices are included in the minimum spanning tree.
  `,
  },
  {
    id: 2,
    heading: "Kruskal's Algorithm",
    content: `
          Kruskal's algorithm is another greedy algorithm for finding a minimum spanning tree in a connected weighted graph.
          It operates by sorting all the edges in increasing order of their weights and then repeatedly adding the smallest edge to the spanning tree, provided that adding the edge does not create a cycle.
          It continues this process until all vertices are connected, forming a minimum spanning tree.
        `,
  },
  {
    id: 3,
    heading: 'Recursive backtracking',
    content: `        
Recursive backtracking is a powerful algorithmic technique commonly used to solve problems involving exploring all possible combinations or configurations of a problem space. It is particularly well-suited for solving problems such as maze generation, Sudoku puzzles, N-queens problems, and more.
        `,
  },
  {
    id: 4,
    heading: 'Wilson algorithm',
    content: `
    Wilson's algorithm typically refers to a maze generation algorithm named after David Wilson, a mathematician known for his work in probability theory and combinatorics. Wilson's algorithm is a randomized algorithm used to generate a maze, and it's particularly interesting because it doesn't rely on recursive techniques like the recursive division method.
        `,
  },
  {
    id: 5,
    heading: 'Recursive division',
    content: `       
Recursive division is a technique commonly used to generate mazes. It works by recursively dividing a region into smaller subregions until certain criteria are met. This technique often results in mazes with long, winding corridors and a single path from the start to the finish.
        `,
  },
  {
    id: 6,
    heading: ' Eller',
    content: `      
    Eller's algorithm, also known as Eller's maze generation algorithm, is a method for generating mazes, named after its creator, J.A. Eller. Unlike some other maze generation algorithms such as recursive division or Prim's algorithm, Eller's algorithm works by iteratively generating one row of the maze at a time, which makes it particularly efficient in terms of memory usage. It's also notable for its ability to generate mazes with horizontal passages that span the entire width of the maze
        `,
  },
  {
    id: 7,
    heading: 'Sidewindern',
    content: `
    The Sidewinder algorithm is another method for generating mazes, which is relatively simple and efficient. It is named after the sidewinder snake due to the pattern it creates in the maze. The algorithm primarily works by carving passages either horizontally or vertically, resulting in a maze with a strong bias towards corridors that are mostly horizontal or mostly vertic
        `,
  },
];

export const modelContent2 = [
  {
    id: 1,
    heading: 'Breadth-First Search (BFS)',
    content: `
        Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures.
        It starts at the root node and explores all the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
        This algorithm uses a queue data structure to keep track of nodes to be explored.
      `,
  },
  {
    id: 2,
    heading: 'Depth-First Search (DFS)',
    content: `
        Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures.
        It starts at the root node and explores as far as possible along each branch before backtracking.
        This algorithm uses a stack data structure to keep track of nodes to be explored.
      `,
  },
  {
    id: 3,
    heading: 'A* Search',
    content: `
        A* search is an informed search algorithm that finds the shortest path between nodes in a graph.
        It evaluates nodes by combining the cost to reach the node with the estimated cost to reach the goal.
        A* uses a heuristic function to estimate the cost to reach the goal from a given node.
      `,
  },
  {
    id: 4,
    heading: 'Greedy Best-First Search',
    content: `
        Greedy best-first search is an informed search algorithm that selects the node to expand based on an evaluation function.
        It prioritizes nodes based solely on the estimated cost to reach the goal from the current node.
        Unlike A*, greedy best-first search does not consider the actual cost to reach the current node.
      `,
  },
];
