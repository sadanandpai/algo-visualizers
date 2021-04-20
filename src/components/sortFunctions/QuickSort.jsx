export async function QuickSort(
  array,
  swap,
  highlight,
  markSort,
  low = 0,
  high = array.length - 1
) {

  if (low <= high) {
    let pivot = await partition(array, low, high);
    await QuickSort(array, swap, highlight, markSort, low, pivot - 1);
    await QuickSort(array, swap, highlight, markSort, pivot + 1, high);
  }

  async function partition(array, low, high) {
    let pivot = low;
    let i = low;
    let j = high + 1;

    while (i < j) {
      while (i <= high) {
        await highlight([i], pivot);
        if (array[++i] > array[pivot]) {
          break;
        }
      }

      while (--j > low) {
        await highlight([i, j], pivot);
        if (array[j] < array[pivot]) {
          break;
        }
      }

      if (i < j) {
        await swap(i, j);
      }
    }

    if (pivot !== j) {
      await swap(pivot, j);
    }

    markSort(j);
    return j;
  }
}
