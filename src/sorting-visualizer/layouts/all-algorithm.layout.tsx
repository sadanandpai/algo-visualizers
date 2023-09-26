import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import AlgoSelection from "../components/controller/AlgoSelection";
import MainLayout from "./main.layout";
import Visualiser from "../components/visualizer/Visualiser";
import { algoList } from "../sorting-algorithms/algoList";
import classes from "./layout.module.scss";
import { setIsPlaying } from "../store/app.slice";
import useCompletion from "../hooks/use-completion.hook";
import { useEffect } from "react";

function AllAlgorithmLayout() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.app.array);
  const reset = useAppSelector((state) => state.app.reset);
  const selectedList = useAppSelector(
    (state) => state.app.selectedList
  )?.filter((item) => item?.selected);
  const updatedList = selectedList?.map((item) => item?.name);

  const { onComplete, isComplete } = useCompletion(updatedList.length, reset);

  useEffect(() => {
    if (isComplete) {
      dispatch(setIsPlaying(null));
    }
  }, [dispatch, isComplete]);

  return (
    <MainLayout>
      <AlgoSelection />

      <div className={classes.allAlgos}>
        {algoList
          ?.filter((item) =>
            updatedList?.length > 0 ? updatedList?.includes(item?.name) : item
          )
          .map((algo) => (
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
