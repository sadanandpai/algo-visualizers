import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { swapTime, compareTime } from "../core/config";
import { ArrayContainer } from "./ArrayContainer";
import { MergeContainer } from "./MergeContainer";
import { InfoFooter } from "./InfoFooter";
import { Timer } from "../core/Timer";

import {ProgressContext} from "../App"
import Card from '@material-ui/core/Card';

let progress = "";
``
const Container = styled(Card)`
  padding: 10px;
  border: 1px solid rgba(0,0,0,0.15);
`;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const SortManager = React.memo(function ({
  array,
  sortFunction,
  sortingAlgorithmName,
  progressStatus,
}) {
  const [swapIndices, setSwapIndices] = useState([-1, -1]);
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1]);

  const algoArray = useRef([]);
  const sortedIndices = useRef([]);
  const pivot = useRef(-1);
  const swapCount = useRef(0);
  const comparisionCount = useRef(0);
  const isAlgoExecutionOver = useRef(false);

  const progressContext = useContext(ProgressContext);
  const sortProgressIterator = useRef(null);

  async function reset() {
    pivot.current = -1;
    sortedIndices.current = [];
    swapCount.current = 0;
    comparisionCount.current = 0;
    algoArray.current = [...array];
    setSwapIndices([-1, -1]);
    setHightlightedIndices([-1, -1]);

    sortProgressIterator.current =
      sortingAlgorithmName === "MergeSort"
        ? await sortFunction(
            algoArray.current,
            combine,
            highlight,
            markSort,
            0,
            true
          )
        : await sortFunction(algoArray.current, swap, highlight, markSort);
  }

  useEffect(() => {
    reset();
  }, [array]);

  useEffect(() => {
    progress = progressStatus;
    if (progress === "start") runAlgo();
    if (progress === "reset") reset();
  }, [progressStatus]);

  async function runAlgo() {
    let completionStatus = { done: false };
    while (!completionStatus.done && progress === "start") {
      completionStatus = await sortProgressIterator.current.next();
    }
    if (completionStatus.done) {
      isAlgoExecutionOver.current = true;
      setSwapIndices([-1, -1]);
      setHightlightedIndices([-1, -1]);
      progressContext.setProgress('done');
    }
  }

  async function swap(i, j) {
    setSwapIndices([i, j]);
    let tmp = algoArray.current[i];
    algoArray.current[i] = algoArray.current[j];
    algoArray.current[j] = tmp;

    pivot.current = -1;
    swapCount.current += 1;
    await delay(swapTime);
  }

  async function combine(source, destination) {
    if (source !== destination) {
      swapCount.current += 1;
      setHightlightedIndices([-1, -1]);
      setSwapIndices([source, destination]);
      await delay(swapTime);
    }
  }

  async function highlight(indices, p) {
    setSwapIndices([-1, -1]);
    comparisionCount.current += 1;
    pivot.current = p;
    setHightlightedIndices(indices);
    await delay(compareTime);
  }

  function markSort(...indices) {
    sortedIndices.current.push(...indices);
  }

  return (
    <Container>
      <div>{sortingAlgorithmName}</div>
      {sortingAlgorithmName === "MergeSort" ? (
        <MergeContainer
          array={algoArray.current}
          source={swapIndices[0]}
          destination={swapIndices[1]}
          hightlightedIndices={hightlightedIndices}
          sortedIndices={sortedIndices.current}
        />
      ) : (
        <ArrayContainer
          array={algoArray.current}
          source={swapIndices[0]}
          destination={swapIndices[1]}
          pivot={pivot.current}
          highlightIndices={hightlightedIndices}
          sortedIndices={sortedIndices.current}
        />
      )}
      <InfoFooter
        swapCount={swapCount.current}
        comparisionCount={comparisionCount.current}
      >
        <Timer progressStatus={progressStatus} isAlgoExecutionOver={isAlgoExecutionOver.current} />
      </InfoFooter>
    </Container>
  );
});