export let arrayForSorting = [3, 3, 4, 4, 5, 1, 6, 7, 8, 9, 2];
export let swapTime = 1000;
export let compareTime = 500;

export function setArrayForSorting(array) {
  arrayForSorting = array.filter((value) => value.replaceAll(" ", ""));
}

export function setSpeed(speed) {
  swapTime = 3000 / speed;
  compareTime = swapTime / 2;
}
