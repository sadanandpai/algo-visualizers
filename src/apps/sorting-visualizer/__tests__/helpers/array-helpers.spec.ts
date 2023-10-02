import {
  convertInputToArrayString,
  getRndmNumInRange,
} from '@/apps/sorting-visualizer/helpers/array-helpers';

describe('getRndmNumInRange', () => {
  it('should generates random number within range', () => {
    const lowerLimit = 10;
    const upperLimit = 20;
    const randomNumber = getRndmNumInRange(lowerLimit, upperLimit);

    expect(randomNumber).toBeGreaterThanOrEqual(lowerLimit);
    expect(randomNumber).toBeLessThanOrEqual(upperLimit);
  });
});

describe('convertInputToArrayString', () => {
  it('should convert input string to array string', () => {
    const input = '1, 2, 3, 4, 5';
    const expectedOutput = '1, 2, 3, 4, 5';

    expect(convertInputToArrayString(input)).toEqual(expectedOutput);
  });

  it('should remove whitespace', () => {
    const input = '1 2 3';
    const expectedOutput = '123';

    expect(convertInputToArrayString(input)).toEqual(expectedOutput);
  });

  it('should remove  non-digit characters', () => {
    const input = '1, ab2, 3, 5gh';
    const expectedOutput = '1, 2, 3, 5';

    expect(convertInputToArrayString(input)).toEqual(expectedOutput);
  });
});
