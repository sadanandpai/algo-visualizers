import {
  highlight,
  sort,
  swap,
} from '@/apps/sorting-visualizer/helpers/algorithm-helpers';
import { SortAsyncGenerator } from '@/apps/sorting-visualizer/models/types';
export async function* bubbleSort(array: number[]): SortAsyncGenerator {
  let i, j;
  for (i = 0; i < array.length; i++) {
    let isSwapped = false; // Flag to track whether any swaps were made in this pass
    for (j = 0; j < array.length - i - 1; j++) {
      yield* highlight(j, j + 1);
      if (array[j] > array[j + 1]) {
        yield* swap(array, j, j + 1);
        isSwapped = true; // Set to true if a swap occurred in this iteration
      }
    }
    if (!isSwapped) {
      break; // If no swaps were made in this pass, the array is already sorted
    }
    yield* sort(j);
  }
}
