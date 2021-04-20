import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { swapTime, compareTime } from "./config";
import { ArrayContainer } from "./ArrayContainer";
import { Info } from "./Info";

const Container = styled.div`
  background-color: aqua;
  padding: 10px;
  border: 2px solid black;
  margin: 10px 0;
`

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function SortManager({ array, sortFunction, sortingAlgorithmName }) {
  const [swapIndices, setSwapIndices] = useState([-1, -1]);
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1]);
  const sortedIndices = useRef([]);
  const pivot = useRef(-1);

  const swapCount = useRef(0);
  const comparisionCount = useRef(0);
  const timeTaken = useRef(0);

  useEffect(() => {
    async function runSort(){
      const startTime = performance.now();
      await sortFunction(array, swap, highlight, markSort);
      const endTime = performance.now();
      timeTaken.current = endTime - startTime;
      
      setHightlightedIndices([-1, -1]);
    }
    runSort();
  }, []);

  async function swap(i, j) {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;

    pivot.current = -1;

    swapCount.current += 1;
    setSwapIndices([i, j]);
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
      <div>
        {sortingAlgorithmName}
      </div>
      <ArrayContainer
        array={array}
        source={swapIndices[0]}
        destination={swapIndices[1]}
        pivot={pivot.current}
        highlightIndices={hightlightedIndices}
        sortedIndices={sortedIndices.current}
      />
      <Info swapCount={swapCount.current} comparisionCount={comparisionCount.current} timeTaken={timeTaken.current} />
    </Container>
  );
}
