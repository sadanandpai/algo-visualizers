import {
  highlight,
  sort,
  swap,
} from '@/apps/sorting-visualizer/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@/apps/sorting-visualizer/models/types';

export async function* shellSort(array: number[]): SortAsyncGenerator {
  if (array.length === 1) {
    yield* sort(0);
    return;
  }

  let gap = 1;

  while (gap * 3 + 1 < array.length) {
    gap = gap * 3 + 1;
  }

  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      let j = i;
      const temp = array[i];
      yield* highlight(j, j - gap);
      while (j > 0 && array[j] <= array[j - gap]) {
        yield* highlight(j, j - gap);
        yield* swap(array, j - gap, j);
        j -= gap;
      }
      array[j] = temp;
      if (gap == 1) {
        yield* sort(0);
        yield* sort(i);
      }
    }
    gap = Math.floor((gap - 1) / 3);
  }
}
