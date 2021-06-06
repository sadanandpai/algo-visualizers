export async function* QuickSort(
  array,
  swap,
  highlight,
  markSort,
  low = 0,
  high = array.length - 1
) {

  if (low <= high) {
    let pivot = yield* await partition(array, low, high);
    yield* await QuickSort(array, swap, highlight, markSort, low, pivot - 1);
    yield* await QuickSort(array, swap, highlight, markSort, pivot + 1, high);
  }

  async function* partition(array, low, high) {
    let pivot = low;
    let i = low;
    let j = high + 1;

    while (i < j) {

      while (--j > low) {
        yield await highlight([i, j], pivot);
        if (array[j] < array[pivot]) {
          break;
        }
      }

      while (i <= high && i < j) {
        yield await highlight([i], pivot);
        if (array[++i] > array[pivot]) {
          break;
        }
      }

      if (i < j) {
        yield await swap(i, j);
      }
    }

    if (pivot !== j) {
      yield await swap(pivot, j);
    }

    markSort(j);
    yield;
    return j;
  }
}
