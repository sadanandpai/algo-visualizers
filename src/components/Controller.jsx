import React, { useRef, useState } from "react";
import styled from "styled-components";
import { VscDebugStart } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import { ImPause } from "react-icons/im";
import { swapTime, setArrayForSorting, setSpeed } from "./config";

function convertInputToArrayData(value){
    value = value.replaceAll(/\d{4}/g, "");
    value = value.replaceAll(/\s\s/g, " ");
    value = value.replaceAll(/\s,/g, ",");
    value = value.replaceAll(/,,/g, ",");
    value = value.replaceAll(/[^0-9,\s]/g, "");
    return value;
}

export function Controller({array, setArray, progress, setProgress}) {
  const [timeSpeed, setTimeSpeed] = useState(3000 / swapTime);

  function startHandler() {
    setProgress('start');
  }

  function pauseHandler() {
    setProgress('pause');
  }

  function stopHandler() {
    setProgress('reset');
  }

  function arrayDataChangeHandler(value) {
    const filteredValue = convertInputToArrayData(value);
    setArrayForSorting([...filteredValue.split(",")]);
    setArray(filteredValue);
    setProgress('reset');
  }

  function speedHandler(value) {
    setSpeed(+value);
    setTimeSpeed(+value);
  }

  return (
    <div style={{ fontSize: "2rem" }}>
      {progress === 'start' ? (
        <ImPause onClick={pauseHandler} />
      ) : (
        <VscDebugStart onClick={startHandler} />
      )}
      <VscDebugRestart onClick={stopHandler} />

      <input
        type="text"
        onChange={(event) => arrayDataChangeHandler(event.target.value)}
        value={array}
      />
      <input type="range" id="speed" min="1" max="5" value={timeSpeed} step="0.5" onChange={(event) => speedHandler(event.target.value)} />
    </div>
  );
}
