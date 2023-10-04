import { useAppDispatch, useAppSelector } from '@/store/hooks';

import MainLayout from './main.layout';
import NoInput from '@/apps/sorting-visualizer/components/visualizer/no-input';
import Visualizer from '@/apps/sorting-visualizer/components/visualizer/visualizer';
import { algoList } from '@/apps/sorting-visualizer/sorting-algorithms/algo-list';
import { setIsPlaying } from '@/apps/sorting-visualizer/store/sorting-visualizer.slice';
import { sortCompletionMessage } from '../config';
import { toast } from 'sonner';
import useCompletion from '@/apps/sorting-visualizer/hooks/use-completion.hook';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      <Visualizer
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
