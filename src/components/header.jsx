import React, { useState } from "react";
import styled from "styled-components";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-basis: 20%;
`;

export function Header() {
  return (
    <HeaderDiv>
      <div>Front-end made easy</div>

      <Nav>
        <div>Challenges</div>
        <div>Resources</div>
        <div>Github</div>
      </Nav>
    </HeaderDiv>
  );
}
