function verifyMaze() {
  cy.get('[data-testid="generate-maze"]').click();
  cy.get('[data-testid="generate-maze"]').should('be.enabled');

  cy.get('[data-cell-type="1"]').should('have.length', 1);
  cy.get('[data-cell-type="2"]').should('have.length', 1);
  cy.get('[data-cell-type="0"]').should('have.length', 807);
  cy.get('[data-cell-type="3"]').should('have.length', 728);
}

describe('path finder', () => {
  beforeEach(() => {
    cy.visit('/#/path-finder');
    cy.viewport(1440, 900);

    const generateMaze = cy.get('[data-testid="generate-maze"]');
    generateMaze.should('be.visible');
    generateMaze.should('be.disabled');
  });

  it('should verify the grid', () => {
    cy.get('[data-cell-type="1"]').should('have.length', 1);
    cy.get('[data-cell-type="2"]').should('have.length', 1);
  });

  it('should verify the prims maze generation', () => {
    cy.get('#maze').select('Prims');
    verifyMaze();
  });

  it('should verify the kruskal maze generation', () => {
    cy.get('#maze').select('Kruskal');
    verifyMaze();
  });

  it('should verify the recursive backtracking maze generation', () => {
    cy.get('#maze').select('Recursive Backtracking');
    verifyMaze();
  });

  it('should verify the recursive division maze generation', () => {
    cy.get('#maze').select('Recursive Division');
    verifyMaze();
  });

  it('should verify the wilson maze generation', () => {
    cy.get('#maze').select('Wilson');
    verifyMaze();
  });

  it('should verify the binary maze generation', () => {
    cy.get('#maze').select('Binary');
    verifyMaze();
  });

  it('should verify the ellers maze generation', () => {
    cy.get('#maze').select('Ellers');
    verifyMaze();
  });

  it('should verify the side winder maze generation', () => {
    cy.get('#maze').select('Side Winder');
    verifyMaze();
  });

  it('should verify the labyrinth maze generation', () => {
    cy.get('#maze').select('Labyrinth');
    verifyMaze();
  });

  it('should verify the random maze generation', () => {
    cy.get('#maze').select('Random');
    cy.get('[data-testid="generate-maze"]').click();
    cy.get('[data-testid="generate-maze"]').should('be.enabled');

    cy.get('[data-cell-type="1"]').should('have.length', 1);
    cy.get('[data-cell-type="2"]').should('have.length', 1);
    cy.get('[data-cell-type="0"]').should('have.length.greaterThan', 500);
    cy.get('[data-cell-type="3"]').should('have.length.greaterThan', 100);
  });
});
