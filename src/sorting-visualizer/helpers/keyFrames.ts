import { interval } from "../store/global";

const animationEl = document.querySelector(
  '[data-id="animation-element"]'
) as HTMLStyleElement;

export function getSwapAnimation(gap: number, time = 1000) {
  const animationName = `anime-${Math.random().toString(36).substring(2, 9)}`;
  const animation = `${time}ms linear forwards ${animationName}`;
  const rule = `@keyframes ${animationName} {
    25% {
        transform: translateY(${Math.sign(gap) * 55}px);
    }
    75% {
        transform: translate(${gap * 50}px, ${Math.sign(gap) * 55}px);
    }
    100% {
        transform: translate(${gap * 50}px, 0);
    }
}`;

  addAnimationRule(rule);
  return animation;
}

export function getMovingAnimation(gap: number, time = 1000) {
  const animationName = `anime-${Math.random().toString(36).substring(2, 9)}`;
  const animation = `${time}ms linear forwards ${animationName}`;

  const rule = `@keyframes ${animationName} {
      100% {
          transform: translateX(${gap * 50}px);
      }
  }`;

  addAnimationRule(rule);
  return animation;
}

function addAnimationRule(rule: string) {
  const animationIdx = animationEl?.sheet?.insertRule(rule);

  // clean up the animation after execution
  setTimeout(() => {
    if (animationIdx) {
      animationEl?.sheet?.deleteRule(animationIdx);
    }
  }, interval);
}
