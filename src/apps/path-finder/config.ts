export const cellColors = {
  clear: 'transparent',
  entry: 'aqua',
  exit: 'lawngreen',
  wall: 'red',
  fill: 'gray',
  path: 'yellow',
};

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--cell-clear', cellColors.clear);
root.style.setProperty('--cell-entry', cellColors.entry);
root.style.setProperty('--cell-exit', cellColors.exit);
root.style.setProperty('--cell-wall', cellColors.wall);
root.style.setProperty('--cell-fill', cellColors.fill);
root.style.setProperty('--cell-path', cellColors.path);
