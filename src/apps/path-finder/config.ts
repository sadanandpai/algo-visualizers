import { Speed } from '@pathFinder/models/enum';

export const cellSize = 25;

export const speeds: Map<Speed, number> = new Map([
  [Speed.Infinity, 0],
  [Speed['4x'], 1],
  [Speed['2x'], 25],
  [Speed['1x'], 50],
  [Speed['0.7x'], 75],
  [Speed['0.5x'], 120],
  [Speed['0.1x'], 250],
]);

export const defaultSpeeds = {
  mobile: Speed['1x'],
  desktop: Speed['4x'],
};

export const cellColors = {
  clear: 'transparent',
  entry: 'deepskyblue',
  exit: 'lawngreen',
  wall: 'darkred',
  visitedStart: 'blue',
  visitedMid: 'deepskyblue',
  visited: 'rgb(225 208 254)',
  path: 'blue',
  pathBorder: 'yellow',
};

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--pf-cell-size', cellSize + 'px');
root.style.setProperty('--pf-cell-clear', cellColors.clear);
root.style.setProperty('--pf-cell-entry', cellColors.entry);
root.style.setProperty('--pf-cell-exit', cellColors.exit);
root.style.setProperty('--pf-cell-wall', cellColors.wall);
root.style.setProperty('--pf-cell-visited', cellColors.visited);
root.style.setProperty('--pf-cell-visited-start', cellColors.visitedStart);
root.style.setProperty('--pf-cell-visited-mid', cellColors.visitedMid);
root.style.setProperty('--pf-cell-path', cellColors.path);
root.style.setProperty('--pf-cell-path-border', cellColors.pathBorder);
