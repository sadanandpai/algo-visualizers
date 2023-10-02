import { useEffect, useRef, useState } from 'react';

import { SortAsyncGenerator } from '@/apps/sorting-visualizer/models/types';
import { resolveWhenPlaying } from '@/apps/sorting-visualizer/store/global.state';

function useAlgo(
  array: number[],
  algorithm: (array: number[]) => SortAsyncGenerator
) {
  const [swaps, setSwaps] = useState([-1, -1]);
  const [moves, setMoves] = useState([-1, -1]);
  const [sorts, setSorts] = useState<number[]>([]);
  const [highlights, setHighlights] = useState([-1, -1]);
  const [pivot, setPivot] = useState<number>(-1);
  const [isCompleted, setIsCompleted] = useState(false);

  const it = useRef(algorithm(array));
  const swapCount = useRef(0);
  const compareCount = useRef(0);

  const fn = async () => {
    await resolveWhenPlaying;

    for await (const data of it.current) {
      setSwaps([-1, -1]);
      setHighlights([-1, -1]);
      setMoves([-1, -1]);

      switch (data.type) {
        case 'swap':
          setHighlights(data.positions);
          setSwaps(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            swapCount.current++;
          }
          break;
        case 'sort':
          setSorts((arr) => [...arr, data.position]);
          break;
        case 'highlight':
          setHighlights(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            compareCount.current++;
          }
          break;
        case 'pivot':
          setPivot(data.position);
          break;
        case 'move':
          setHighlights([data.positions[0], data.positions[0] + 1]);
          setMoves(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            swapCount.current++;
          }
          break;
      }
    }

    setIsCompleted(true);
  };

  useEffect(() => {
    fn();
  }, []);

  return {
    pivot,
    isCompleted,
    swaps,
    sorts,
    highlights,
    moves,
    swapCount: swapCount.current,
    compareCount: compareCount.current,
  };
}

export default useAlgo;
