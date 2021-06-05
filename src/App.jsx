import React, { useState } from "react";
import styled from "styled-components";
import "./app.css";
import { Header } from "./components/Header";
import { Controller } from "./components/Controller";
import { Home } from "./components/AlgoDisplay";
import { arrayForSorting } from "./core/config";

export const ProgressContext = React.createContext({
  value: '',
});

const Container = styled.div`
  margin: 0 10px;
`;

export default function App() {
  const [array, setArray] = useState(arrayForSorting);
  const [progress, setProgress] = useState("reset");
  const [algoSelection, setAlgoSelection] = useState(0);

  const handleChange = (event, newValue) => {
    setAlgoSelection(newValue);
  };

  const state = {
    progress: progress,
    setProgress: setProgress
  }

  return (
    <Container>
      <ProgressContext.Provider value={state}>
        <Header value={algoSelection} handleChange={handleChange} />
        <Controller
          array={array}
          setArray={setArray}
          algoSelection={algoSelection}
          progress={progress}
          setProgress={setProgress}
        />
        <Home progress={progress} value={algoSelection} />
      </ProgressContext.Provider>
    </Container>
  );
}
