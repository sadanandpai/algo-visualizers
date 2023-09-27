import { useEffect, useRef, useState } from "react";

import { SortAsyncGenerator } from "@/apps/sorting-visualizer/models/types";
import { resolveWhenPlaying } from "@/apps/sorting-visualizer/store/global.state";

function useAlgo(
  array: number[],
  algorithm: (array: number[]) => SortAsyncGenerator
) {
  const [swapPositions, setSwapPositions] = useState([-1, -1]);
  const [movePositions, setMovePositions] = useState([-1, -1]);
  const [sortPositions, setSortPositions] = useState<number[]>([]);
  const [highlightPositions, setHighlightPositions] = useState([-1, -1]);
  const [pivot, setPivot] = useState<number>(-1);
  const [isCompleted, setIsCompleted] = useState(false);

  const it = useRef(algorithm(array));
  const swaps = useRef(0);
  const compares = useRef(0);

  const fn = async () => {
    await resolveWhenPlaying;

    for await (const data of it.current) {
      setSwapPositions([-1, -1]);
      setHighlightPositions([-1, -1]);
      setMovePositions([-1, -1]);

      switch (data.type) {
        case "swap":
          setHighlightPositions(data.positions);
          setSwapPositions(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            swaps.current++;
          }
          break;
        case "sort":
          setSortPositions((arr) => [...arr, data.position]);
          break;
        case "highlight":
          setHighlightPositions(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            compares.current++;
          }
          break;
        case "pivot":
          setPivot(data.position);
          break;
        case "move":
          setHighlightPositions([data.positions[0], data.positions[0] + 1]);
          setMovePositions(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            swaps.current++;
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
    swapPositions,
    sortPositions,
    highlightPositions,
    movePositions,
    swaps: swaps.current,
    compares: compares.current,
  };
}

export default useAlgo;
