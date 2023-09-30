let resolver: () => void;
export let resolveWhenPlaying: Promise<void>;
export let isPlaying = false;
export const maxInterval = 2000;
export let highlightInterval = 250;
export let swapInterval = 1000;

export const playSimulation = () => {
  if (isPlaying) {
    return;
  }

  isPlaying = true;
  resolver();
};

export const pauseSimulation = () => {
  if (!isPlaying) {
    return;
  }

  isPlaying = false;
  setResolver();
};

export const setResolver = () => {
  resolveWhenPlaying = new Promise<void>((resolve) => {
    resolver = resolve;
  });
};

export const setSwapInterval = (interval: number) => {
  swapInterval = interval;
};

export const setHighlightInterval = (interval: number) => {
  highlightInterval = interval;
};

setResolver();
