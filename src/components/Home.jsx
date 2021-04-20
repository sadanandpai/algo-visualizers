import React, { useEffect, useState } from "react";
import { SortManager } from "./SortManager";
import { MergeManager } from "./MergeManager";
import { BubbleSort } from "./sortFunctions/BubbleSort";
import { SelectionSort } from "./sortFunctions/SelectionSort";
import { InsertionSort } from "./sortFunctions/InsertionSort";
import { QuickSort } from "./sortFunctions/QuickSort";
import { HeapSort } from "./sortFunctions/HeapSort";
import { MergeSort } from "./sortFunctions/MergeSort";

import {array} from "./config"

export function Home() {
  return (
    <>
      {/* <SortManager array={[...array]} sortFunction={BubbleSort} sortingAlgorithmName='BubbleSort' />
      <SortManager array={[...array]} sortFunction={SelectionSort} sortingAlgorithmName='SelectionSort' />
      <SortManager array={[...array]} sortFunction={InsertionSort} sortingAlgorithmName='InsertionSort' /> */}
      <SortManager array={[...array]} sortFunction={QuickSort} sortingAlgorithmName='QuickSort' />
      <SortManager array={[...array]} sortFunction={HeapSort} sortingAlgorithmName='HeapSort' />
      <MergeManager array={[...array]} sortFunction={MergeSort} sortingAlgorithmName='MergeSort' />
    </>
  );
}
