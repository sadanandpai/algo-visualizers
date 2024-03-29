const mazes = [
  'Prims',
  'Kruskal',
  'Recursive Backtracking',
  'Recursive Division',
  'Wilson',
  'Binary',
  'Ellers',
  'Side Winder',
  'Labyrinth',
];

const pathFinders = [
  'Breadth First Search',
  'Depth First Search',
  'A* Search',
  'Greedy Best First',
];

describe('path finder', () => {
  beforeEach(() => {
    cy.visit('/#/path-finder');
    cy.viewport(1440, 900);
  });

  it('should verify the maze dropdowns', () => {
    cy.get('#maze').should('contain.text', 'Select a Maze');

    for (const maze of mazes) {
      cy.get('#maze').should('contain.text', maze);
    }
  });

  it('should verify the path finder dropdowns', () => {
    cy.get('#path-finder').should('contain.text', 'Select a Path finder');

    for (const pathFinder of pathFinders) {
      cy.get('#path-finder').should('contain.text', pathFinder);
    }
  });

  it('should verify the grid', () => {
    cy.get('[data-cell-type="1"]').should('have.length', 1);
    cy.get('[data-cell-type="2"]').should('have.length', 1);
  });
});
