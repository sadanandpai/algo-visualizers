import React from "react";
import styled from "styled-components";

const InfoFlex = styled.div`
  display: flex;
  justify-content: space-between;

  & > div:last-child {
    flex-basis: 125px;
  }
`;

export function InfoFooter({ swapCount, comparisionCount, children }) {
  return (
    <InfoFlex>
      <div>Swaps: {swapCount}</div>
      <div>Comparisions: {comparisionCount}</div>
      <div>Time: {children} s</div>
    </InfoFlex>
  );
}
