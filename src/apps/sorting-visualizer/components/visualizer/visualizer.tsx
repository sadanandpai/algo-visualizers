import { useEffect, useRef } from 'react';

import Header from './header';
import VisualizerDisplay from './visualizer-display';
import { VisualizerProps } from '@/apps/sorting-visualizer/models/interfaces';
import classes from './visualizer.module.scss';
import useAlgo from '@/apps/sorting-visualizer/hooks/use-algo.hook';

const Visualizer = function Visualizer({
  array,
  algoFn,
  algoName = 'Bubble',
  onComplete,
}: VisualizerProps) {
  const sortingArray = useRef([...array]);

  const {
    swapCount,
    compareCount,
    isCompleted,
    swaps,
    sorts,
    highlights,
    pivot,
    moves,
  } = useAlgo(sortingArray.current, algoFn);

  useEffect(() => {
    if (isCompleted) {
      onComplete();
    }
  }, [isCompleted, onComplete]);

  return (
    <section className={classes.container}>
      <Header algoName={algoName} isCompleted={isCompleted} />

      <VisualizerDisplay
        pivot={pivot}
        array={sortingArray.current}
        swaps={swaps}
        highlights={highlights}
        sorts={sorts}
        moves={moves}
      />

      <footer>
        <span>
          Swaps: <strong>{swapCount}</strong>
        </span>
        <span>
          Comparisons: <strong>{compareCount}</strong>
        </span>
      </footer>
    </section>
  );
};

export default Visualizer;
