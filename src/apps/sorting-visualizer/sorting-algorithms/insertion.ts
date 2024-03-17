import { highlight, sort, swap } from '@sortViz/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@sortViz/models/types';

export async function* insertionSort(array: number[]): SortAsyncGenerator {
  let i, j;
  for (i = 0; i < array.length; i++) {
    let keyIndex = i;
    for (j = i - 1; j >= 0; j--) {
      yield* highlight(keyIndex, j);

      if (array[j] > array[keyIndex]) {
        yield* swap(array, j, keyIndex);
        keyIndex = j;
      } else {
        break;
      }
    }

    yield* sort(i);
  }
}
