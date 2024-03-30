import { mazes, pathFinders } from 'utils/path';

function verifyMaze() {
  cy.get('[data-testid="generate-maze"]').should('be.enabled');
  cy.get('[data-cell-type="1"]').should('have.length', 1);
  cy.get('[data-cell-type="2"]').should('have.length', 1);
  cy.get('[data-cell-type="3"]').should('have.length', 432);
  cy.get('[data-cell-type="0"]').should('have.length', 491);
}

function verifyPath() {
  cy.get('[data-testid="generate-maze"]').should('be.enabled');
  cy.get('[data-cell-type="1"]').should('have.length', 1);
  cy.get('[data-cell-type="2"]').should('have.length', 1);
  cy.get('[data-cell-type="3"]').should('have.length', 432);
  cy.get('[data-cell-type="5"]').should('have.length.greaterThan', 50);
}

function verifyInfo() {
  const visits = cy.get('[data-testid="visits"]');
  const path = cy.get('[data-testid="path"]');
  const time = cy.get('[data-testid="time"]');

  visits.invoke('text').then(parseInt).should('be.greaterThan', 40);
  path.invoke('text').then(parseInt).should('be.greaterThan', 40);
  time.invoke('text').then(parseInt).should('be.greaterThan', 5);
}

describe('path finder', () => {
  beforeEach(() => {
    cy.visit('/#/path-finder');

    const generateMaze = cy.get('[data-testid="generate-maze"]');
    generateMaze.should('be.visible');
    generateMaze.should('be.disabled');
    cy.get('#maze').should('contain.text', 'Select a Maze');
  });

  it('should verify the grid', () => {
    cy.get('[data-cell-type="1"]').should('have.length', 1);
    cy.get('[data-cell-type="2"]').should('have.length', 1);
  });

  it('should verify the mazes generation', () => {
    for (const maze of mazes) {
      cy.get('#maze').select(maze);
      verifyMaze();

      for (const pathFinder of pathFinders) {
        cy.get('#path-finder').select(pathFinder);
        verifyPath();
        verifyInfo();
      }
    }
  });

  it('should verify the random maze generation', () => {
    cy.get('#maze').select('Random');
    cy.get('[data-testid="generate-maze"]').should('be.enabled');

    cy.get('[data-cell-type="1"]').should('have.length', 1);
    cy.get('[data-cell-type="2"]').should('have.length', 1);
    cy.get('[data-cell-type="0"]').should('have.length.greaterThan', 500);
    cy.get('[data-cell-type="3"]').should('have.length.greaterThan', 100);

    for (const pathFinder of pathFinders) {
      cy.get('#path-finder').select(pathFinder);
      cy.get('[data-cell-type="3"]').should('have.length.greaterThan', 100);
    }
  });
});
