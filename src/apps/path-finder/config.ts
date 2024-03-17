export const cellSize = 25;

export const speeds = new Map([
  ['∞', 0],
  ['4x', 1],
  ['2x', 25],
  ['1x', 50],
  ['0.7x', 75],
  ['0.5x', 120],
  ['0.1x', 250],
]);

export const defaultSpeeds = {
  mobile: '1x',
  desktop: '4x',
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
