import React from "react";
import styled from "styled-components";

import { SortManager } from "./SortManager";
import { BubbleSort } from "./sortFunctions/BubbleSort";
import { SelectionSort } from "./sortFunctions/SelectionSort";
import { InsertionSort } from "./sortFunctions/InsertionSort";
import { QuickSort } from "./sortFunctions/QuickSort";
import { HeapSort } from "./sortFunctions/HeapSort";
import { MergeSort } from "./sortFunctions/MergeSort";

import { arrayForSorting } from "./config";

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:center;

  & > div {
    flex-basis: 50%;
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const sortAlgos = []

export function Home({ progress, value }) {
  return (
    <div>
      <TabPanel value={value} index={0}>
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={BubbleSort}
          sortingAlgorithmName="BubbleSort"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={SelectionSort}
          sortingAlgorithmName="SelectionSort"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={InsertionSort}
          sortingAlgorithmName="InsertionSort"
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={HeapSort}
          sortingAlgorithmName="HeapSort"
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={MergeSort}
          sortingAlgorithmName="MergeSort"
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <SortManager
          array={arrayForSorting}
          progressStatus={progress}
          sortFunction={QuickSort}
          sortingAlgorithmName="QuickSort"
        />
      </TabPanel>

      <TabPanel value={value} index={6}>
        <FlexWrap>
          <SortManager
            array={arrayForSorting}
            progressStatus={progress}
            sortFunction={BubbleSort}
            sortingAlgorithmName="BubbleSort"
          />
          <SortManager
            array={arrayForSorting}
            progressStatus={progress}
            sortFunction={SelectionSort}
            sortingAlgorithmName="SelectionSort"
          />
          <SortManager
            array={arrayForSorting}
            progressStatus={progress}
            sortFunction={InsertionSort}
            sortingAlgorithmName="InsertionSort"
          />
          <SortManager
            array={arrayForSorting}
            progressStatus={progress}
            sortFunction={HeapSort}
            sortingAlgorithmName="HeapSort"
          />
          <SortManager
            array={arrayForSorting}
            progressStatus={progress}
            sortFunction={MergeSort}
            sortingAlgorithmName="MergeSort"
          />
          <SortManager
            array={arrayForSorting}
            progressStatus={progress}
            sortFunction={QuickSort}
            sortingAlgorithmName="QuickSort"
          />
        </FlexWrap>
      </TabPanel>
    </div>
  );
}
