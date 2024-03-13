export const cellSize = 25;

export const cellColors = {
  clear: 'transparent',
  entry: 'deepskyblue',
  exit: 'lawngreen',
  wall: 'darkred',
  fillStart: 'blue',
  fillMid: 'deepskyblue',
  fill: 'rgb(225 208 254)',
  path: 'deepskyblue',
};

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--pf-cell-size', cellSize + 'px');
root.style.setProperty('--pf-cell-clear', cellColors.clear);
root.style.setProperty('--pf-cell-entry', cellColors.entry);
root.style.setProperty('--pf-cell-exit', cellColors.exit);
root.style.setProperty('--pf-cell-wall', cellColors.wall);
root.style.setProperty('--pf-cell-fill', cellColors.fill);
root.style.setProperty('--pf-cell-fill-start', cellColors.fillStart);
root.style.setProperty('--pf-cell-fill-mid', cellColors.fillMid);
root.style.setProperty('--pf-cell-path', cellColors.path);
