import { algoList } from './sorting-algorithms/algo-list';

export const menuItems = algoList.map((item) => item.name).concat('all');
export const initialArray = [6, 8, 3, 5, 1, 9, 2, 7, 4];
export const numberGenerator = { min: 10, max: 40 };
export const sortCompletionMessage = 'Sorting is complete';

export const cellCSS = {
  size: 50,
  margin: 4,
};

export const barCSS = {
  size: 30,
  minSize: 10,
  maxHeight: 250,
  margin: 2,
};

export const colors = {
  sort: '#8cf12b',
  highlight: 'yellow',
  pivot: 'orange',
  bar: 'lightgrey',
};

export const selectedAlgosStatus = algoList.map(() => true);

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--cell-size', `${cellCSS.size}px`);
root.style.setProperty('--cell-margin', `${cellCSS.margin}px`);
root.style.setProperty('--bar-size', `${barCSS.size}px`);
root.style.setProperty('--bar-min-size', `${barCSS.minSize}px`);
root.style.setProperty('--bar-max-height', `${barCSS.maxHeight}px`);
root.style.setProperty('--bar-margin', `${barCSS.margin}px`);
root.style.setProperty('--color-sort', colors.sort);
root.style.setProperty('--color-highlight', colors.highlight);
root.style.setProperty('--color-pivot', colors.pivot);
root.style.setProperty('--color-bar', colors.bar);
