import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { swapTime, compareTime } from "./config";
import { ArrayContainer } from "./ArrayContainer";
import { Info } from "./Info";

let progress = "";

const Container = styled.div`
  background-color: aqua;
  padding: 10px;
  border: 2px solid black;
  margin: 10px 0;
`;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function SortManager({
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
  const timeTaken = useRef(0);

  const sortProgressIterator = useRef(null);

  async function reset() {
    pivot.current = -1;
    sortedIndices.current = [];
    algoArray.current = [...array];
    setSwapIndices([-1, -1]);
    setHightlightedIndices([-1, -1]);

    sortProgressIterator.current = await sortFunction(
      algoArray.current,
      swap,
      highlight,
      markSort
    );
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
      setHightlightedIndices([-1, -1]);
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
      <ArrayContainer
        array={algoArray.current}
        source={swapIndices[0]}
        destination={swapIndices[1]}
        pivot={pivot.current}
        highlightIndices={hightlightedIndices}
        sortedIndices={sortedIndices.current}
      />
      <Info
        swapCount={swapCount.current}
        comparisionCount={comparisionCount.current}
        timeTaken={timeTaken.current}
      />
    </Container>
  );
}
