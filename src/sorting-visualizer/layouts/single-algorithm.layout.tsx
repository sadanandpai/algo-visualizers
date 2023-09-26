import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import MainLayout from "./main.layout";
import Visualiser from "../components/visualizer/Visualiser";
import { algoList } from "../sorting-algorithms/algoList";
import { setIsPlaying } from "../store/app.slice";
import useCompletion from "../hooks/use-completion.hook";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleAlgorithmLayout() {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.app.array);
  const reset = useAppSelector((state) => state.app.reset);
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
