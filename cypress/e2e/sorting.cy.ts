import { getRndmNumInRange } from '../../src/apps/sorting-visualizer/helpers/array-helpers';
import { initialArray } from '../../src/apps/sorting-visualizer/config';

const algorithms = [
  'bubble',
  'selection',
  'insertion',
  'heap',
  'merge',
  'quick',
  'shell',
  'cocktail',
];

const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
)?.set;

function setTheInput(inputArray: number[]) {
  const inputArrayString = inputArray.join(', ');
  cy.get('#user-input').type(`{selectAll} ${inputArrayString}`);

  return {
    inputArrayText: inputArray.join(''),
    inputArrayTextSorted: inputArray.sort((a, b) => a - b).join(''),
  };
}

function verifySorting(inputArrayText: string, inputArrayTextSorted: string) {
  cy.get('[data-testid="cell-values"]').should('contain.text', inputArrayText);
  cy.get('#speed').then(($range) => {
    const range = $range[0];
    nativeInputValueSetter?.call(range, 20);
    range.dispatchEvent(
      new Event('change', { value: 20, bubbles: true } as EventInit)
    );
  });

  const player = cy.get('[data-testid="player"]');
  player.click();

  player.should('be.disabled');
  cy.get('[data-testid="cell-values"]').should(
    'contain.text',
    inputArrayTextSorted
  );
}

describe('sorting', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should verify sorting for known array', () => {
    const { inputArrayText, inputArrayTextSorted } = setTheInput(initialArray);

    for (const algo of algorithms) {
      cy.get('a').contains(algo).click();
      verifySorting(inputArrayText, inputArrayTextSorted);
    }
  });

  it('should verify sorting for random small array', () => {
    const { inputArrayText, inputArrayTextSorted } = setTheInput(
      Array.from(new Array(10), () => getRndmNumInRange())
    );

    for (const algo of algorithms) {
      cy.get('a').contains(algo).click();
      verifySorting(inputArrayText, inputArrayTextSorted);
    }
  });

  it('should verify sorting for random large array', () => {
    const { inputArrayText, inputArrayTextSorted } = setTheInput(
      Array.from(new Array(25), () => getRndmNumInRange())
    );

    for (const algo of algorithms) {
      cy.get('a').contains(algo).click();
      verifySorting(inputArrayText, inputArrayTextSorted);
    }
  });
});
