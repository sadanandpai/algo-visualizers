import { useAppDispatch, useAppSelector } from "@/store/hooks";

import BarUI from "@/apps/sorting-visualizer/components/bar/bar-ui";
import CellUI from "@/apps/sorting-visualizer/components/cell/cell-ui";
import MainLayout from "./main.layout";
import NoInput from "@/apps/sorting-visualizer/components/visualizer/no-input";
import Visualizer from "@/apps/sorting-visualizer/components/visualizer/visualizer";
import { algoList } from "@/apps/sorting-visualizer/sorting-algorithms/algo-list";
import { setIsPlaying } from "@/apps/sorting-visualizer/store/sorting-visualizer.slice";
import useCompletion from "@/apps/sorting-visualizer/hooks/use-completion.hook";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleAlgorithmLayout() {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const reset = useAppSelector((state) => state.sortViz.reset);
  const visualizerType = useAppSelector(
    (state) => state.sortViz.visualizerType
  );
  const selectedAlgo =
    algoList.find(({ name }) => name === algoName) ?? algoList[0];

  const { onComplete, isComplete } = useCompletion(1, reset);

  useEffect(() => {
    if (isComplete) {
      dispatch(setIsPlaying(null));
    }
  }, [dispatch, isComplete]);

  if (array.length === 0) {
    return (
      <MainLayout>
        <NoInput />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Visualizer
        key={selectedAlgo.name + array.toString() + reset + visualizerType}
        array={array}
        algoName={selectedAlgo.name}
        algoFn={selectedAlgo.fn}
        onComplete={onComplete}
        Render={visualizerType === "cell" ? CellUI : BarUI}
      />
    </MainLayout>
  );
}

export default SingleAlgorithmLayout;
