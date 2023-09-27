import { expect, test } from "vitest";

import { getRndmNumInRange } from "../../helpers/array-helpers";

test("getRndmNumInRange generates random number within range", () => {
  const lowerLimit = 10;
  const upperLimit = 20;
  const randomNumber = getRndmNumInRange(lowerLimit, upperLimit);

  expect(randomNumber).toBeGreaterThanOrEqual(lowerLimit);
  expect(randomNumber).toBeLessThanOrEqual(upperLimit);
});
