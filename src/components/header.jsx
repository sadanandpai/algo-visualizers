import React, { useState } from "react";
import styled from "styled-components";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function Header() {
  return <h2>Sorting Algorithms Visualizer</h2>;
}
