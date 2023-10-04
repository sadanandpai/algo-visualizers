const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
).set;

function verifySorting() {
  cy.get('#user-input').should('contain.value', '6, 8, 3, 5, 1, 9, 2, 7, 4');
  cy.get('#user-input').type('{selectAll} 6, 8, 3, 5, 9, 2, 7');

  cy.get('[data-testid="cell-values"]').should('contain.text', '6835927');
  cy.get('#speed').then(($range) => {
    const range = $range[0];
    nativeInputValueSetter.call(range, 20);
    range.dispatchEvent(
      new Event('change', { value: 20, bubbles: true } as EventInit)
    );
  });

  const player = cy.get('[data-testid="player"]');
  player.click();

  player.should('be.disabled');
  cy.get('[data-testid="cell-values"]').should('contain.text', '2356789');
}

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should verify bubble sort', () => {
    cy.get('a').contains('bubble').click();
    verifySorting();
  });

  it('should verify selection sort', () => {
    cy.get('a').contains('selection').click();
    verifySorting();
  });

  it('should verify insertion sort', () => {
    cy.get('a').contains('insertion').click();
    verifySorting();
  });

  it('should verify heap sort', () => {
    cy.get('a').contains('heap').click();
    verifySorting();
  });

  it('should verify merge sort', () => {
    cy.get('a').contains('merge').click();
    verifySorting();
  });

  it('should verify quick sort', () => {
    cy.get('a').contains('quick').click();
    verifySorting();
  });

  it('should verify shell sort', () => {
    cy.get('a').contains('shell').click();
    verifySorting();
  });

  it('should verify cocktail sort', () => {
    cy.get('a').contains('cocktail').click();
    verifySorting();
  });
});
