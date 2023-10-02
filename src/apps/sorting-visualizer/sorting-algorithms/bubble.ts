import {
  highlight,
  sort,
  swap,
} from '@/apps/sorting-visualizer/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@/apps/sorting-visualizer/models/types';

export async function* bubbleSort(array: number[]): SortAsyncGenerator {
  let i, j;

  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array.length - i - 1; j++) {
      yield* highlight(j, j + 1);

      if (array[j] > array[j + 1]) {
        yield* swap(array, j, j + 1);
      }
    }

    yield* sort(j);
  }
}
