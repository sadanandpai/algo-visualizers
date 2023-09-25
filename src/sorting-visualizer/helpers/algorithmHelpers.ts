import { interval, resolveWhenPlaying } from "../store/global";

import { SortAsyncGenerator } from "../models/types";

export async function* swap(
  array: number[],
  i: number,
  j: number
): SortAsyncGenerator {
  await resolveWhenPlaying;

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  yield { type: "swap", positions: [i, j] };
  await delay(interval);

  await resolveWhenPlaying;
}

export async function* highlight(...positions: number[]): SortAsyncGenerator {
  yield { type: "highlight", positions: [-1, -1] };
  await delay(interval / 4);
  await resolveWhenPlaying;

  yield { type: "highlight", positions };
  await delay(interval / 2);

  await resolveWhenPlaying;
}

export async function* showPivot(position: number): SortAsyncGenerator {
  yield { type: "pivot", position };
}

export async function* move(...positions: number[]): SortAsyncGenerator {
  await resolveWhenPlaying;
  yield { type: "move", positions };
  await delay(interval);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
