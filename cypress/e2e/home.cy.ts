describe('landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should verify sorting', () => {
    cy.get('[data-testid="navbar"]').should('be.visible');

    cy.get('[data-testid="navbar"]').should(
      'contain.html',
      'Sorting visualizers'
    );
  });
});
