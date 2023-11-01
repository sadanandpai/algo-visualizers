export const cellSize = 25;

export const cellColors = {
  clear: 'transparent',
  entry: 'aqua',
  exit: 'lawngreen',
  wall: 'red',
  fill: 'gray',
  path: 'yellow',
};

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--pf-cell-size', cellSize + 'px');
root.style.setProperty('--pf-cell-clear', cellColors.clear);
root.style.setProperty('--pf-cell-entry', cellColors.entry);
root.style.setProperty('--pf-cell-exit', cellColors.exit);
root.style.setProperty('--pf-cell-wall', cellColors.wall);
root.style.setProperty('--pf-cell-fill', cellColors.fill);
root.style.setProperty('--pf-cell-path', cellColors.path);
