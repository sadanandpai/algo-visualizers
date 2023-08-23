export async function* ShellSort(array, swap, highlight, marksort) {
  let gap = 1;

  while (gap * 3 + 1 < array.length) {
    gap = gap * 3 + 1;
  }

  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      let j = i;
      let temp = array[i];
      yield await highlight([j, j - gap]);
      while (j > 0 && array[j] <= array[j - gap]) {
        yield await highlight([j, j - gap]);
        yield await swap(j - gap, j);
        j -= gap;
      }

      array[j] = temp;

      if (gap == 1) {
        marksort(0);
        marksort(i);
        yield;
      }
    }

    gap = Math.floor((gap - 1) / 3);
  }
}
