import {
  highlight,
  sort,
  swap,
} from '@/apps/sorting-visualizer/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@/apps/sorting-visualizer/models/types';

export async function* cocktailSort(array: number[]): SortAsyncGenerator {
  for (let i = 0; i < array.length; i++) {
    let j = i;
    let sorted = 1;

    for (; j < array.length - 1 - i; j++) {
      yield* highlight(j, j + 1);

      if (array[j] > array[j + 1]) {
        yield* swap(array, j, j + 1);
        sorted = 0;
      }
    }

    if (sorted == 1) {
      for (let index = 0; index < array.length; index++) {
        yield* sort(index);
      }

      return;
    }

    yield* sort(array.length - 1 - i);

    sorted = 1;

    for (let k = j - 1; k > array.length - j - 1; k--) {
      yield* highlight(k - 1, k);

      if (array[k] < array[k - 1]) {
        yield* swap(array, k - 1, k);
        sorted = 0;
      }
    }

    if (sorted == 1) {
      for (let index = 0; index < array.length; index++) {
        yield* sort(index);
      }
      return;
    }

    yield* sort(i);
  }
}
