let resolver: () => void;
export let resolveWhenPlaying: Promise<void>;
export let isPlaying = false;
export let animationInterval = 200;

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
  animationInterval = 1100 - speed * 100;
};

setResolver();
