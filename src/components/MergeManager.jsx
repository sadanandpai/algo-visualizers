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
  const [bounds, setBounds] = useState([0, array.length-1]);
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1]);
  const sortedIndices = useRef([]);

  const swapCount = useRef(0);
  const comparisionCount = useRef(0);
  const timeTaken = useRef(0);

  useEffect(() => {
    async function runSort(){
      const startTime = performance.now();
      await sortFunction(array, partition, 0, combine, highlight);
      const endTime = performance.now();
      timeTaken.current = endTime - startTime;
      
      setHightlightedIndices([-1, -1]);
    }
    runSort();
  }, []);

  async function partition(left, right) {
    setBounds([left, right]);
    await delay(swapTime);
  }

  async function combine(source, destination) {
    comparisionCount.current += 1;
    setSwapIndices([source, destination]);
    await delay(swapTime);
  }

  async function highlight(indices) {
    setHightlightedIndices(indices);
    await delay(swapTime);
  }

  return (
    <Container>
      <div>
        {sortingAlgorithmName}
      </div>
      <MergeContainer
        array={array}
        left={bounds[0]}
        right={bounds[1]}
        source={swapIndices[0]}
        destination={swapIndices[1]}
        hightlightedIndices={hightlightedIndices}
      />
      <Info swapCount={swapCount.current} comparisionCount={comparisionCount.current} timeTaken={timeTaken.current} />
    </Container>
  );
}
