import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { swapTime, compareTime } from "./config";
import { MergeContainer } from "./MergeContainer";
import { Info } from "./Info";

const Container = styled.div`
  background-color: aqua;
  padding: 10px;
  border: 2px solid black;
  margin: 10px 0;
`;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function MergeManager({ array, sortFunction, sortingAlgorithmName }) {
  const [swapIndices, setSwapIndices] = useState([-1, -1]);
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1]);
  
  const sortedIndices = useRef([]);
  const swapCount = useRef(0);
  const comparisionCount = useRef(0);
  const timeTaken = useRef(0);

  useEffect(() => {
    async function runSort() {
      const startTime = performance.now();
      await sortFunction(array, combine, highlight, markSort, 0, true);
      const endTime = performance.now();
      timeTaken.current = endTime - startTime;

      setHightlightedIndices([-1, -1]);
    }
    runSort();
  }, []);

  async function highlight(indices) {
    comparisionCount.current += 1;
    setHightlightedIndices(indices);
    await delay(compareTime);
  }

  async function combine(source, destination) {
    swapCount.current += 1;
    setSwapIndices([source, destination]);
    await delay(swapTime);
  }

  async function markSort(...indices) {
    sortedIndices.current.push(...indices);
  }

  return (
    <Container>
      <div>{sortingAlgorithmName}</div>
      <MergeContainer
        array={array}
        source={swapIndices[0]}
        destination={swapIndices[1]}
        hightlightedIndices={hightlightedIndices}
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
