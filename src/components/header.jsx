import React, { useRef, useState } from "react";
import styled from "styled-components";

const SelectionDiv = styled.div`
  display: flex;
  gap: 20px;

  a {
    border: 1px solid black;
    background-color: bisque;
    text-align: center;
    flex-grow: 1;
    padding: 10px;
  }
`;

export function Header() {
  return (
    <>
      <h2>Sorting Algorithms Visualizer</h2>
      <SelectionDiv>
        <a href="#bubble">Bubble</a>
        <a href="#selection">Selection</a>
        <a href="#insertion">Insertion</a>
        <a href="#heap">Heap</a>
        <a href="#merge">Merge</a>
        <a href="#quick">Quick</a>
        <a href="#all">All</a>
      </SelectionDiv>
    </>
  );
}
