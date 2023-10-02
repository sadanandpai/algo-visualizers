import {
  highlightInterval,
  resolveWhenPlaying,
  swapInterval,
} from '@/apps/sorting-visualizer/store/global.state';

import { SortAsyncGenerator } from '@/apps/sorting-visualizer/models/types';

export async function* swap(
  array: number[],
  i: number,
  j: number
): SortAsyncGenerator {
  await resolveWhenPlaying;

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  yield { type: 'swap', positions: [i, j] };
  await delay(swapInterval);

  await resolveWhenPlaying;
}

export async function* highlight(...positions: number[]): SortAsyncGenerator {
  yield { type: 'highlight', positions: [-1, -1] };
  await delay(highlightInterval);
  await resolveWhenPlaying;

  yield { type: 'highlight', positions };
  await delay(highlightInterval);

  await resolveWhenPlaying;
}

export async function* showPivot(position: number): SortAsyncGenerator {
  yield { type: 'pivot', position };
}

export async function* sort(position: number): SortAsyncGenerator {
  yield { type: 'sort', position: position };
}

export async function* move(...positions: number[]): SortAsyncGenerator {
  await resolveWhenPlaying;
  yield { type: 'move', positions };
  await delay(swapInterval);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
