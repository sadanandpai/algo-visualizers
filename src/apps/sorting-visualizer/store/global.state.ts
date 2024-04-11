import { Simulator } from '@/lib/helpers/simulator';

export const maxInterval = 2000;
export let highlightInterval = 250;
export let swapInterval = 1000;
export const simulator = new Simulator();

export const setSwapInterval = (interval: number) => {
  swapInterval = interval;
};

export const setHighlightInterval = (interval: number) => {
  highlightInterval = interval;
};
