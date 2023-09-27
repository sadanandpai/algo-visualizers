import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import AlgoSelection from "../components/controller/algo-selection";
import MainLayout from "./main.layout";
import Visualiser from "../components/visualizer/visualizer";
import { algoList } from "../sorting-algorithms/algo-list";
import classes from "./layout.module.scss";
import { setIsPlaying } from "../store/sorting-visualizer.slice";
import useCompletion from "../hooks/use-completion.hook";
import { useEffect } from "react";

function AllAlgorithmLayout() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const reset = useAppSelector((state) => state.sortViz.reset);
  const selectedAlgosStatus = useAppSelector(
    (state) => state.sortViz.selectedAlgosStatus
  );

  const selectedAlgos = algoList.filter((_, idx) => selectedAlgosStatus[idx]);
  const { onComplete, isComplete } = useCompletion(selectedAlgos.length, reset);

  useEffect(() => {
    if (isComplete) {
      dispatch(setIsPlaying(null));
    }
  }, [dispatch, isComplete]);

  return (
    <MainLayout>
      <AlgoSelection />

      <div className={classes.allAlgos}>
        {selectedAlgos.map((algo) => (
          <Visualiser
            key={array.toString() + reset + algo.name}
            array={array}
            algoName={algo.name}
            algoFn={algo.fn}
            onComplete={onComplete}
          />
        ))}
      </div>
    </MainLayout>
  );
}

export default AllAlgorithmLayout;
