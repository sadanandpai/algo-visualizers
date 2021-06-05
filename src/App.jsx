import React, { useState } from "react";
import styled from "styled-components";
import "./app.css";
import { Header } from "./components/Header";
import { Controller } from "./components/Controller";
import { AlgoDisplay } from "./components/AlgoDisplay";
import { sortingArray } from "./core/config";

const Container = styled.div`
  margin: 0 10px;
`;

export default function App() {
  const [array, setArray] = useState(sortingArray);
  const [algoSelection, setAlgoSelection] = useState(0);

  const handleChange = (event, newValue) => {
    setAlgoSelection(newValue);
  };

  return (
    <Container>
        <Header value={algoSelection} handleChange={handleChange} />
        <Controller
          array={array}
          setArray={setArray}
          algoSelection={algoSelection}
        />
        <AlgoDisplay value={algoSelection} />
    </Container>
  );
}
