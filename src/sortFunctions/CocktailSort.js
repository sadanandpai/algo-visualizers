export async function* CocktailSort(array, swap, highlight, marksort) {
  for (let i = 0; i < array.length; i++) {
    let j = i;

    for (; j < array.length - 1 - i; j++) {
      yield await highlight([j, j + 1]);
      if (array[j] > array[j + 1]) {
        yield await swap(j, j + 1);
      }
    }

    marksort(array.length - 1 - i);
    yield;

    for (let k = j - 1; k > array.length - j - 1; k--) {
      yield await highlight([k, k - 1]);
      if (array[k] < array[k - 1]) {
        yield await swap(k - 1, k);
      }
    }

    marksort(i);
    yield;
  }
}
