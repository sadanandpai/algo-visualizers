import {
  getRandomEvenNumber,
  getRandomOddNumber,
} from '@/apps/path-finder/algorithms/maze-generator/recursive-division';

describe('Recursive Division', () => {
  it('getRandomEvenNumber', () => {
    for (let i = 0; i < 100; i++) {
      const min = Math.floor(Math.random() * 20);
      const max = min + Math.floor(Math.random() * 20) + 1;
      const number = getRandomEvenNumber(min, max);
      expect(number).toBeGreaterThanOrEqual(min);
      expect(number).toBeLessThanOrEqual(max);
      expect(number % 2).toBe(0);
    }
  });

  it('getRadomOddNumber', () => {
    for (let i = 0; i < 100; i++) {
      const min = Math.floor(Math.random() * 20);
      const max = min + Math.floor(Math.random() * 20) + 1;
      const number = getRandomOddNumber(min, max);
      expect(number).toBeGreaterThanOrEqual(min);
      expect(number).toBeLessThanOrEqual(max);
      expect(number % 2).toBe(1);
    }
  });
});
