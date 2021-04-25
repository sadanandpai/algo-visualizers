import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { swapTime, compareTime } from "./config";

const Container = styled.div`
  display: flex;
  height: 150px;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
`;

const comparisionColor = "pink";
const swapColor = "yellow";
const sortedColor = "springgreen";
const pivotColor = "sandybrown";

const sourceAnimation = (distance) => keyframes`
  0%{
    background-color: ${swapColor};
  }
  40%{
    transform: translate(0px, 0px);
    background-color: ${swapColor};
  }
  60% {
    transform: translate(0px, 50px);
    background-color: ${swapColor};
  }
  80% {
    transform: translate(-${distance * 50}px, 50px);
    background-color: ${swapColor};
  }
  99% {
    transform: translate(-${distance * 50}px, 0px);
    background-color: ${swapColor};
  }
  100%{
    transform: translate(-${distance * 50}px, 0px);
    background-color: none;
  }
`;

const destinationAnimation = (distance) => keyframes`
  0%{
    background-color: ${swapColor};
  }
  40%{
    transform: translate(0px, 0px);
    background-color: ${swapColor};
  }
  60% {
    transform: translate(0px, -50px);
    background-color: ${swapColor};
  }
  80% {
    transform: translate(${distance * 50}px, -50px);
    background-color: ${swapColor};
  }
  99% {
    transform: translate(${distance * 50}px, 0px);
    background-color: ${swapColor};
  }
  100%{
    transform: translate(${distance * 50}px, 0px);
    background-color: none;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 50px;
  height: 50px;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

const Source = styled(Item)`
  animation: ${(props) => destinationAnimation(props.distance)}
    ${(props) => props.swapTime / 1000}s forwards;
`;

const Destination = styled(Item)`
  animation: ${(props) => sourceAnimation(props.distance)} ${(props) => props.swapTime / 1000}s
    forwards;
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
    if (sortedIndices.includes(i)) {
      return sortedColor;
    }

    if (i === pivot) {
      return pivotColor;
    }

    if (highlightIndices.includes(i)) {
      return comparisionColor;
    }

    return "";
  }

  return (
    <Container>
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
          <Item
            key={i + ":" + destination + ":" + source + ":" + value}
            style={{
              order: i,
              backgroundColor: getBackgroundColor(i),
            }}
          >
            {value}
          </Item>
        );
      })}
    </Container>
  );
}
