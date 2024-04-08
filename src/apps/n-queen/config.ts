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

export const colors = {
  oddCell: '#50c878',
  evenCell: 'white',
  border: 'black',
};

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--nq-odd-cell', colors.oddCell);
root.style.setProperty('--nq-even-cell', colors.evenCell);
root.style.setProperty('--nq-cell-border', colors.border);
