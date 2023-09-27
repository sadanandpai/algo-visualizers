let resolver: () => void;
export let resolveWhenPlaying: Promise<void>;
export let isPlaying = false;
export let animationInterval = 1000;

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

export const setAnimationInterval = (speed: number) => {
  animationInterval = 2000 / speed;
};

setResolver();
