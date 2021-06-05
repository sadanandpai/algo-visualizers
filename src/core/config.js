// colors setting
export const comparisionColor = "pink";
export const swapColor = "yellow";
export const sortedColor = "springgreen";
export const pivotColor = "sandybrown";

// time setting
export let swapTime = 1000;
export let compareTime = 500;

// init array
export let arrayForSorting = [8,7,6,5,4,3,2,1];

export function setArrayForSorting(array) {
  arrayForSorting = array.filter((value) => value === "" ? false : true).map(v => +v);
}

export function setSpeed(speed) {
  swapTime = 3000 / speed;
  compareTime = swapTime / 2;
}
