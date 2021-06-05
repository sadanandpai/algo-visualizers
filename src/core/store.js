import create from "zustand";
import { devtools } from "zustand/middleware";
import { sortingArray, compareTime, swapTime } from "./config";

export const useControls = create(
  devtools((set) => ({
    progress: "reset",
    speed: 3,
    compareTime: compareTime,
    swapTime: swapTime,

    startSorting: () => set({ progress: "start" }),
    pauseSorting: () => set({ progress: "pause" }),
    resetSorting: () => set({ progress: "reset" }),
    markSortngDone: () => set({ progress: "done" }),

    setSpeed: (speed) =>
      set(() => {
        return { swapTime: 3000 / speed, compareTime: 1500 / speed, speed };
      }),
  }))
);

export const useData = create(
  devtools((set) => ({
    algorithmSelection: "BubbleSort",
    sortingArray: sortingArray,

    setSortingArray: (array) => set({sortingArray: array}),
    setAlgorithm: (algoName) => set({ algorithmSelection: algoName }),
  }))
);
