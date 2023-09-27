import { bubbleSort } from "./bubble";
import { heapSort } from "./heap";
import { insertionSort } from "./insertion";
import { mergeSort } from "./merge";
import { quickSort } from "./quick";
import { selectionSort } from "./selection";

export const algoList = [
  {
    name: "bubble",
    fn: bubbleSort,
  },
  {
    name: "selection",
    fn: selectionSort,
  },
  {
    name: "insertion",
    fn: insertionSort,
  },
  {
    name: "heap",
    fn: heapSort,
  },
  {
    name: "merge",
    fn: mergeSort,
  },
  {
    name: "quick",
    fn: quickSort,
  },
];
