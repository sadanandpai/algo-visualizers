import { useAppDispatch, useAppSelector } from '@/store/hooks';

import AlgoSelection from '@/apps/sorting-visualizer/components/controller/algo-selection';
import MainLayout from './main.layout';
import NoInput from '@/apps/sorting-visualizer/components/visualizer/no-input';
import Visualizer from '@/apps/sorting-visualizer/components/visualizer/visualizer';
import { algoList } from '@/apps/sorting-visualizer/sorting-algorithms/algo-list';
import classes from './layout.module.scss';
import { setIsPlaying } from '@/apps/sorting-visualizer/store/sorting-visualizer.slice';
import { sortCompletionMessage } from '../config';
import { toast } from 'sonner';
import useCompletion from '@/apps/sorting-visualizer/hooks/use-completion.hook';
import { useEffect } from 'react';

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
