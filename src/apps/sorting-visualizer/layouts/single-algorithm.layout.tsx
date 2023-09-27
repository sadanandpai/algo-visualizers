import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import MainLayout from "./main.layout";
import Visualiser from "../components/visualizer/visualizer";
import { algoList } from "../sorting-algorithms/algo-list";
import { setIsPlaying } from "../store/sorting-visualizer.slice";
import useCompletion from "../hooks/use-completion.hook";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleAlgorithmLayout() {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const reset = useAppSelector((state) => state.sortViz.reset);
  const selectedAlgo =
    algoList.find(({ name }) => name === algoName) ?? algoList[0];

  const { onComplete, isComplete } = useCompletion(1, reset);

  useEffect(() => {
    if (isComplete) {
      dispatch(setIsPlaying(null));
    }
  }, [dispatch, isComplete]);

  return (
    <MainLayout>
      <Visualiser
        key={selectedAlgo.name + array.toString() + reset}
        array={array}
        algoName={selectedAlgo.name}
        algoFn={selectedAlgo.fn}
        onComplete={onComplete}
      />
    </MainLayout>
  );
}

export default SingleAlgorithmLayout;
