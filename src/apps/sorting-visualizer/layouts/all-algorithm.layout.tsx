import { useAppDispatch, useAppSelector } from "@/store/hooks";

import AlgoSelection from "@/apps/sorting-visualizer/components/controller/algo-selection";
import BarUI from "@/apps/sorting-visualizer/components/bar/bar-ui";
import CellUI from "@/apps/sorting-visualizer/components/cell/cell-ui";
import MainLayout from "./main.layout";
import NoInput from "@/apps/sorting-visualizer/components/visualizer/no-input";
import Visualizer from "@/apps/sorting-visualizer/components/visualizer/visualizer";
import { algoList } from "@/apps/sorting-visualizer/sorting-algorithms/algo-list";
import classes from "./layout.module.scss";
import { setIsPlaying } from "@/apps/sorting-visualizer/store/sorting-visualizer.slice";
import useCompletion from "@/apps/sorting-visualizer/hooks/use-completion.hook";
import { useEffect } from "react";

function AllAlgorithmLayout() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const reset = useAppSelector((state) => state.sortViz.reset);
  const selectedAlgosStatus = useAppSelector(
    (state) => state.sortViz.selectedAlgosStatus
  );
  const visualizerType = useAppSelector(
    (state) => state.sortViz.visualizerType
  );

  let selectedAlgos = algoList.filter((_, idx) => selectedAlgosStatus[idx]);
  if (selectedAlgos.length === 0) {
    selectedAlgos = algoList;
  }
  const { onComplete, isComplete } = useCompletion(selectedAlgos.length, reset);

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
      <AlgoSelection />

      <div className={classes.allAlgos}>
        {selectedAlgos.map((algo) => (
          <Visualizer
            key={array.toString() + reset + algo.name + visualizerType}
            array={array}
            algoName={algo.name}
            algoFn={algo.fn}
            onComplete={onComplete}
            Render={visualizerType === "cell" ? CellUI : BarUI}
          />
        ))}
      </div>
    </MainLayout>
  );
}

export default AllAlgorithmLayout;
