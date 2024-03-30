import { mazes, pathFinders } from 'utils/path';

describe('path finder', () => {
  beforeEach(() => {
    cy.visit('/#/path-finder');
  });

  it('should verify page header', () => {
    cy.get('[data-testid="title"]').should('be.visible');
    cy.get('[data-testid="title"]').should('contain.html', 'Path Finder');
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
