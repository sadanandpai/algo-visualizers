import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  swapTime,
  comparisionColor,
  swapColor,
  sortedColor,
  pivotColor,
} from "../core/config";
import { useWindowSize } from "react-use";

import {
  ArrayHolder,
  ArrayItem,
  sourceAnimation,
  destinationAnimation,
} from "../core/styles";

const Source = styled(ArrayItem)`
  animation: ${(props) => destinationAnimation(props.distance, swapColor)}
    ${(props) => props.swapTime / 1000}s forwards;
`;

const Destination = styled(ArrayItem)`
  animation: ${(props) => sourceAnimation(props.distance, swapColor)}
    ${(props) => props.swapTime / 1000}s forwards;
`;

export function ArrayContainer({
  array,
  source,
  destination,
  pivot = -1,
  highlightIndices,
  sortedIndices,
}) {
  const { width, height } = useWindowSize();
  console.log(width);

  function getBackgroundColor(i) {
    if (highlightIndices.includes(i)) {
      return comparisionColor;
    }

    if (sortedIndices.includes(i)) {
      return sortedColor;
    }

    if (i === pivot) {
      return pivotColor;
    }

    return "";
  }

  return (
    <ArrayHolder>
      {array.map((value, i) => {
        if (i === source) {
          return (
            <Source
              key={i + ":" + source + ":" + destination + ":" + value}
              distance={destination - source}
              swapTime={swapTime}
              style={{
                order: source,
                backgroundColor: getBackgroundColor(i),
              }}
            >
              {value}
            </Source>
          );
        }
        if (i === destination) {
          return (
            <Destination
              key={i + ":" + destination + ":" + source + ":" + value}
              distance={destination - source}
              swapTime={swapTime}
              style={{
                order: destination,
                backgroundColor: getBackgroundColor(i),
              }}
            >
              {value}
            </Destination>
          );
        }
        return (
          <ArrayItem
            key={i + ":" + destination + ":" + source + ":" + value}
            style={{
              order: i,
              backgroundColor: getBackgroundColor(i),
            }}
          >
            {value}
          </ArrayItem>
        );
      })}
    </ArrayHolder>
  );
}
