import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import MainLayout from './main.layout';
import NoInput from '@sortViz/components/visualizer/no-input';
import Visualizer from '@sortViz/components/visualizer/visualizer';
import { algoList } from '@sortViz/sorting-algorithms/algo-list';
import { setIsPlaying } from '@sortViz/store/sorting-visualizer.slice';
import { sortCompletionMessage } from '@sortViz/config';
import { toast } from 'sonner';
import useCompletion from '@sortViz/hooks/use-completion.hook';
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
