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
`

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function MergeManager({ array, sortFunction, sortingAlgorithmName }) {
  const [swapIndices, setSwapIndices] = useState([-1, -1]);
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1]);
  const finalMerge = useRef(false);

  const swapCount = useRef(0);
  const comparisionCount = useRef(0);
  const timeTaken = useRef(0);

  useEffect(() => {
    async function runSort(){
      const startTime = performance.now();
      await sortFunction(array, combine, highlight, 0, true);
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

  async function combine(source, destination, fM) {
    swapCount.current += 1;
    finalMerge.current = fM;
    setSwapIndices([source, destination]);
    await delay(swapTime);
  }

  return (
    <Container>
      <div>
        {sortingAlgorithmName}
      </div>
      <MergeContainer
        array={array}
        source={swapIndices[0]}
        destination={swapIndices[1]}
        hightlightedIndices={hightlightedIndices}
        finalMerge={finalMerge.current}
      />
      <Info swapCount={swapCount.current} comparisionCount={comparisionCount.current} timeTaken={timeTaken.current} />
    </Container>
  );
}
