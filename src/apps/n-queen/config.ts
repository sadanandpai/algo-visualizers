import { Speed } from '@nQueen/models/enum';

export const speeds: Map<string, number> = new Map([
  [Speed.Infinity, 0],
  [Speed['4x'], 1],
  [Speed['2x'], 25],
  [Speed['1x'], 50],
  [Speed['0.7x'], 100],
  [Speed['0.5x'], 250],
]);

export const defaultSpeeds = {
  mobile: Speed['1x'],
  desktop: Speed['4x'],
};

export const size = 4;
