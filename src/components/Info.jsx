import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InfoFlex = styled.div`
  display: flex;
  justify-content: space-between;
`

export function Info({swapCount, comparisionCount, timeTaken}) {
  return (
    <InfoFlex>
      <div>Swaps: {swapCount}</div>
      <div>Comparisions: {comparisionCount}</div>
      <div>Time: {(timeTaken / 1000).toFixed(2)} s</div>
    </InfoFlex>
  );
}
