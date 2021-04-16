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

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 50px;
  height: 50px;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  transition: transform ${swapTime / 1000}s;

  &[data-level="false"] {
    transform: translate(${(props) => props.move * 50}px, 50px);
  }

  &[data-level="true"] {
    transform: translate(${(props) => props.move * 50}px, 0px);
  }
`;

const generateIndices = (length) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(i);
  }
  return array;
};

const generateLevels = (length) => {
  const array = new Array(length);
  array.fill(0, 0);
  return array;
};

const generateHighlights = (length) => {
  const array = new Array(length);
  array.fill(false, 0);
  return array;
};

export function MergeContainer({
  array,
  left = 0,
  right = array.length - 1,
  source,
  destination,
  hightlightedIndices,
}) {
  const levels = useRef(generateLevels(array.length));
  const positions = useRef(generateIndices(array.length));
  const highlights = useRef(generateHighlights(array.length));

  console.log(source, destination)

  useEffect(() => {
    for (let i = 0; i < array.length; i++) {
      if (i >= left && i <= right) {
        levels.current[i] = !levels.current[i];
      }
    }
  }, [left, right]);

  useEffect(() => {
    levels.current[positions.current.indexOf(source)] = !levels.current[
      positions.current.indexOf(source)
    ];
    positions.current[positions.current.indexOf(source)] = destination;
  }, [source, destination]);

  // useEffect(() => {
  //   highlights.current[positions.current.indexOf(hightlightedIndices[0])] = true;
  //   highlights.current[positions.current.indexOf(hightlightedIndices[1])] = true;
  // }, [hightlightedIndices]);

  const items = [];
  for (let i = 0; i <= array.length - 1; i++) {
    items.push(
      <Item
        key={i + ":" + array[i]}
        data-level={levels.current[i]}
        data-pos={positions.current[i]}
        move={positions.current[i] - i}
        style={{ backgroundColor: [positions.current[positions.current.indexOf(hightlightedIndices[0])], positions.current[positions.current.indexOf(hightlightedIndices[1])]].includes(i) ? comparisionColor : "" }}
      >
        {array[i]}
      </Item>
    );
  }

  return <Container>{items}</Container>;
}
