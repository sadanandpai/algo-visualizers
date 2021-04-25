import React from "react";
import { SortManager } from "./SortManager";
import { MergeManager } from "./MergeManager";
import { BubbleSort } from "./sortFunctions/BubbleSort";
import { SelectionSort } from "./sortFunctions/SelectionSort";
import { InsertionSort } from "./sortFunctions/InsertionSort";
import { QuickSort } from "./sortFunctions/QuickSort";
import { HeapSort } from "./sortFunctions/HeapSort";
import { MergeSort } from "./sortFunctions/MergeSort";

import { arrayForSorting } from "./config";

export function Home({ progress }) {
  return (
    <div className="sort-holder" id="all">
      <div id="bubble">
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={BubbleSort}
          sortingAlgorithmName="BubbleSort"
        />
      </div>
      <div id="selection">
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={SelectionSort}
          sortingAlgorithmName="SelectionSort"
        />
      </div>
      <div id="insertion">
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={InsertionSort}
          sortingAlgorithmName="InsertionSort"
        />
      </div>
      <div id="heap">
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={HeapSort}
          sortingAlgorithmName="HeapSort"
        />
      </div>
      <div id="merge">
        <MergeManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={MergeSort}
          sortingAlgorithmName="MergeSort"
        />
      </div>
      <div id="quick">
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={QuickSort}
          sortingAlgorithmName="QuickSort"
        />
      </div>
    </div>
  );
}
