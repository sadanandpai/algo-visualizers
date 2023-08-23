export async function* OddevenSort(array, swap, highlight, marksort) {
  let sorted = 0;

  while (!sorted) {
    sorted = 1;

    for (let i = 0; i < array.length; i += 2) {
      yield await highlight([i, i + 1]);
      if (array[i] > array[i + 1]) {
        yield await highlight([i, i + 1]);
        yield await swap(i, i + 1);
        sorted = 0;
      }
    }

    for (let i = 1; i < array.length; i += 2) {
      yield await highlight([i, i + 1]);
      if (array[i] > array[i + 1]) {
        yield await highlight([i, i + 1]);
        yield await swap(i, i + 1);
        sorted = 0;
      }
    }
  }
}
