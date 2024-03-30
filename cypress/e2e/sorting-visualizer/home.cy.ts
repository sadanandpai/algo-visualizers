describe('landing page', () => {
  beforeEach(() => {
    cy.visit('/#/sorting-visualizer');
  });

  it('should verify sorting', () => {
    cy.get('[data-testid="title"]').should('be.visible');

    cy.get('[data-testid="title"]').should(
      'contain.html',
      'Sorting Visualizer'
    );
  });
});
