import React, { useState } from "react";
import styled from "styled-components";
import "./app.css";
import { Header } from "./components/header";
import { Controller } from "./components/Controller";
import { Home } from "./components/Home";
import { arrayForSorting } from "./components/config";

export const ProgressContext = React.createContext({
  value: '',
  setValue: () => {}
});

const Container = styled.div`
  margin: 0 10px;
`;

export default function App() {
  const [array, setArray] = useState(arrayForSorting);
  const [progress, setProgress] = useState("reset");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const state = {
    progress: progress,
    setProgress: setProgress
  }

  return (
    <Container>
      <ProgressContext.Provider value={state}>
        <Header value={value} handleChange={handleChange} />
        <Controller
          array={array}
          setArray={setArray}
          progress={progress}
          setProgress={setProgress}
        />
        <Home progress={progress} value={value} />
      </ProgressContext.Provider>
    </Container>
  );
}
