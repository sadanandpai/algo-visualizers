import {
  highlight,
  showPivot,
  sort,
  swap,
} from '@/apps/sorting-visualizer/helpers/algorithm-helpers';

import { SortAsyncGenerator } from '@/apps/sorting-visualizer/models/types';

export async function* heapSort(array: number[]): SortAsyncGenerator {
  let length = array.length;
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    yield* maxHeap(array, i, length);
  }

  for (let i = array.length - 1; i > 0; i--) {
    length--;
    yield* sort(length);
    yield* swap(array, 0, i);
    yield* maxHeap(array, 0, length);
  }

  yield* sort(0);
}

async function* maxHeap(
  array: number[],
  i: number,
  length: number
): SortAsyncGenerator {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let max = i;

  const highlightArray = [];
  if (left < length) highlightArray.push(left);
  if (right < length) highlightArray.push(right);

  if (highlightArray.length > 0) {
    yield* showPivot(i);
    yield* highlight(...highlightArray);
  }

  if (left < length) {
    if (array[left] > array[max]) {
      max = left;
    }
  }

  if (right < length) {
    if (array[right] > array[max]) {
      max = right;
    }
  }

  if (max !== i) {
    yield* swap(array, i, max);
    yield* showPivot(-1);
    yield* maxHeap(array, max, length);
  }
}
