import React from "react";
import styled from "styled-components";
import {
  comparisionColor,
  swapColor,
  sortedColor,
  pivotColor,
} from "../../common/config";
import { useControls } from "../../common/store";

let swapTime = useControls.getState().swapTime;
useControls.subscribe(
  (time) => (swapTime = time),
  (state) => state.swapTime
);

import {
  ArrayHolder,
  ArrayItem,
  sourceAnimation,
  destinationAnimation,
} from "../../common/styles";

const Source = styled(ArrayItem)`
  animation: ${(props) => destinationAnimation(props.distance, swapColor)}
    ${() => swapTime / 1000}s forwards;
`;

const Destination = styled(ArrayItem)`
  animation: ${(props) => sourceAnimation(props.distance, swapColor)}
    ${() => swapTime / 1000}s forwards;
`;

export function ArrayContainer({
  array,
  source,
  destination,
  pivot = -1,
  highlightIndices,
  sortedIndices,
}) {

  function getBackgroundColor(i) {
    if (i === pivot) {
      return pivotColor;
    }

    if (highlightIndices.includes(i)) {
      return comparisionColor;
    }

    if (sortedIndices.includes(i)) {
      return sortedColor;
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
              style={{
                order: destination,
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
              style={{
                order: source,
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
