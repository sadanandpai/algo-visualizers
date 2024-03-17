import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import AlgoSelection from '@sortViz/components/controller/algo-selection';
import NoInput from '@sortViz/components/visualizer/no-input';
import Visualizer from '@sortViz/components/visualizer/visualizer';
import { sortCompletionMessage } from '@sortViz/config';
import useCompletion from '@sortViz/hooks/use-completion.hook';
import { algoList } from '@sortViz/sorting-algorithms/algo-list';
import { setIsPlaying } from '@sortViz/store/sorting-visualizer.slice';
import { useEffect } from 'react';
import { toast } from 'sonner';
import classes from './layout.module.scss';
import MainLayout from './main.layout';

function AllAlgorithmLayout() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const reset = useAppSelector((state) => state.sortViz.reset);
  const selectedAlgosStatus = useAppSelector(
    (state) => state.sortViz.selectedAlgosStatus
  );

  let selectedAlgos = algoList.filter((_, idx) => selectedAlgosStatus[idx]);
  if (selectedAlgos.length === 0) {
    selectedAlgos = algoList;
  }
  const { onComplete, isComplete } = useCompletion(selectedAlgos.length, reset);

  useEffect(() => {
    if (isComplete) {
      toast.success(sortCompletionMessage);
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
