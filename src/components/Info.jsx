import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InfoFlex = styled.div`
  display: flex;
  justify-content: space-between;
`

export function Info({swapCount, comparisionCount, timeTaken}) {
  return (
    <InfoFlex>
      <div>Total swaps: {swapCount}</div>
      <div>Total comparisions: {comparisionCount}</div>
      <div>Total time: {(timeTaken / 1000).toFixed(2)} seconds</div>
    </InfoFlex>
  );
}
