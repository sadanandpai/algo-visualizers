import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InfoFlex = styled.div`
  display: flex;
  justify-content: space-between;

  

  & > div:last-child{
    flex-basis: 130px;
  }
`

export function Info({swapCount, comparisionCount, children}) {
  return (
    <InfoFlex>
      <div>Swaps: {swapCount}</div>
      <div>Comparisions: {comparisionCount}</div>
      <div>Time: {children} s</div>
    </InfoFlex>
  );
}
