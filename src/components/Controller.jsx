import React, { useRef, useState } from "react";
import styled from "styled-components";

import { VscDebugStart } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import { ImPause } from "react-icons/im";

import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import shallow from "zustand/shallow";
import { useControls, useData } from "../core/store";
import { convertInputToArrayString, convertArrayStringToArray, getRandomArray } from "../core/helper";

const ControlBar = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;


export function Controller() {
  const [progress, speed] = useControls(
    (state) => [state.progress, state.speed],
    shallow
  );

  const [sortingArray, setSortingArray] = useData(
    (state) => [state.sortingArray, state.setSortingArray],
    shallow
  );

  const [startSorting, pauseSorting, resetSorting, setSpeed] = useControls(
    (state) => [
      state.startSorting,
      state.pauseSorting,
      state.resetSorting,
      state.setSpeed,
    ],
    shallow
  );

  const [arrayInput, setArrayInput] = useState(sortingArray);

  const startElement = <VscDebugStart onClick={startSorting} />;
  const pauseElement = <ImPause onClick={pauseSorting} />;
  const resetElement = <VscDebugRestart onClick={resetSorting} />;
  const disabledPauseElement = <ImPause style={{ color: "#e5e5e5" }} />;

  function arrayDataChangeHandler(value) {
    const arrayString = convertInputToArrayString(value);
    setArrayInput(arrayString);
    
    const array = convertArrayStringToArray(arrayString);
    setSortingArray(array);
    resetSorting();
  }

  function generate() {
    const randomArray = getRandomArray();
    setArrayInput(randomArray);
    setSortingArray(randomArray);
    resetSorting();
  }

  function getProgressButton() {
    switch (progress) {
      case "reset":
        return startElement;
      case "start":
        return pauseElement;
      case "pause":
        return startElement;
      case "done":
        return disabledPauseElement;
    }
  }

  return (
    <ControlBar>
      <Button
        variant="contained"
        color="primary"
        onClick={generate}
        style={{ margin: "0 10px" }}
      >
        Generate
      </Button>

      <TextField
        id="outlined-basic"
        label="Input"
        variant="outlined"
        onChange={(event) => arrayDataChangeHandler(event.target.value)}
        value={arrayInput}
        size="small"
        width="100px"
        style={{ flexBasis: "50%", flexGrow: 1 }}
      />

      <Slider
        key={`slider-${speed}`}
        defaultValue={speed}
        onChange={(event, value) => setSpeed(value)}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        style={{ margin: "0 15px", flexBasis: "30%" }}
      />

      <div style={{ display: "flex" }}>
        {getProgressButton()}
        {resetElement}
      </div>
    </ControlBar>
  );
}
