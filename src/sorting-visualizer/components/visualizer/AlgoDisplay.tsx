import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import Visualiser from "./Visualiser";
import { algoList } from "../../sorting-algorithms/algoList";
import { setIsPlaying } from "@/sorting-visualizer/store/app.slice";
import { useParams } from "react-router-dom";
import { useRef } from "react";

const ErrorInfoEl = (
  <h2>
    Enter a valid list of numbers separated by commas to start (max 3 digits per
    number)
  </h2>
);

function AlgoDisplay() {
  const array = useAppSelector((state) => state.app.array);
  const reset = useAppSelector((state) => state.app.reset);
  const completionCount = useRef(0);
  const { algoName } = useParams();
  const dispatch = useAppDispatch();

  if (array.length === 0) {
    return ErrorInfoEl;
  }

  const selectedAlgo = algoList.find(({ name }) => name === algoName);

  function onComplete() {
    completionCount.current++;

    if (selectedAlgo) {
      dispatch(setIsPlaying(null));
      completionCount.current = 0;
      return;
    }

    if (completionCount.current === algoList.length) {
      dispatch(setIsPlaying(null));
      completionCount.current = 0;
    }
  }

  if (selectedAlgo) {
    return (
      <Visualiser
        key={selectedAlgo.name + array.toString() + reset}
        array={array}
        algoName={selectedAlgo.name}
        algoFn={selectedAlgo.fn}
        onComplete={onComplete}
      />
    );
  }

  return (
    <>
      {algoList.map((algo) => (
        <Visualiser
          key={array.toString() + reset + algo.name}
          array={array}
          algoName={algo.name}
          algoFn={algo.fn}
          onComplete={onComplete}
        />
      ))}
    </>
  );
}

export default AlgoDisplay;
