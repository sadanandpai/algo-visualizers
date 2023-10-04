import {
  playSimulation,
  setHighlightInterval,
  setSwapInterval,
} from '@/apps/sorting-visualizer/store/global.state';
import { renderHook, waitFor } from '@testing-library/react';

import { algoList } from '@/apps/sorting-visualizer/sorting-algorithms/algo-list';
import { getRndmNumInRange } from '@/apps/sorting-visualizer/helpers/array-helpers';
import { initialArray } from '@/apps/sorting-visualizer/config';
import useAlgo from '@/apps/sorting-visualizer/hooks/use-algo.hook';

describe('useAlgo hook', () => {
  beforeAll(() => {
    setSwapInterval(0);
    setHighlightInterval(0);
    playSimulation();
  });

  it('should sort initial array', async () => {
    for (const algo of algoList) {
      const array = initialArray;
      const { result } = renderHook(() => useAlgo(array, algo.fn));
      await waitFor(() => expect(result.current.isCompleted).toBe(true));

      const sortedArray = [...array].sort((a, b) => a - b);
      expect(array).toEqual(sortedArray);
    }
  });

  it('should sort random array of small length', async () => {
    const smallArray = Array.from(new Array(10), () => getRndmNumInRange());

    for (const algo of algoList) {
      const array = [...smallArray];

      const { result } = renderHook(() => useAlgo(array, algo.fn));
      await waitFor(() => expect(result.current.isCompleted).toBe(true));

      const sortedArray = [...array].sort((a, b) => a - b);
      expect(array).toEqual(sortedArray);
    }
  });

  it('should sort random array of large length', async () => {
    const largeArray = Array.from(new Array(25), () => getRndmNumInRange());

    for (const algo of algoList) {
      const array = [...largeArray];

      const { result } = renderHook(() => useAlgo(array, algo.fn));
      await waitFor(() => expect(result.current.isCompleted).toBe(true));

      const sortedArray = [...array].sort((a, b) => a - b);
      expect(array).toEqual(sortedArray);
    }
  }, 10000);

  it('should sort an array of single element', async () => {
    for (const algo of algoList) {
      const array = [5];

      const { result } = renderHook(() => useAlgo(array, algo.fn));
      await waitFor(() => expect(result.current.isCompleted).toBe(true));

      const sortedArray = [...array].sort((a, b) => a - b);
      expect(array).toEqual(sortedArray);
    }
  });

  it('should sort an array of two elements', async () => {
    for (const algo of algoList) {
      const array = [5, 2];

      const { result } = renderHook(() => useAlgo(array, algo.fn));
      await waitFor(() => expect(result.current.isCompleted).toBe(true));

      const sortedArray = [...array].sort((a, b) => a - b);
      expect(array).toEqual(sortedArray);
    }
  });

  it('should sort an array of duplicate elements', async () => {
    for (const algo of algoList) {
      const array = [5, 2, 7, 2, 4, 2, 8, 1, 5];

      const { result } = renderHook(() => useAlgo(array, algo.fn));
      await waitFor(() => expect(result.current.isCompleted).toBe(true));

      const sortedArray = [...array].sort((a, b) => a - b);
      expect(array).toEqual(sortedArray);
    }
  });

  it('should sort an array of sorted elements', async () => {
    for (const algo of algoList) {
      const array = [3, 5, 7, 8, 9, 12];

      const { result } = renderHook(() => useAlgo(array, algo.fn));
      await waitFor(() => expect(result.current.isCompleted).toBe(true));

      const sortedArray = [...array].sort((a, b) => a - b);
      expect(array).toEqual(sortedArray);
    }
  });

  it('should sort an array of reverse sorted elements', async () => {
    for (const algo of algoList) {
      const array = [12, 9, 8, 6, 4, 2, 1, 0];

      const { result } = renderHook(() => useAlgo(array, algo.fn));
      await waitFor(() => expect(result.current.isCompleted).toBe(true));

      const sortedArray = [...array].sort((a, b) => a - b);
      expect(array).toEqual(sortedArray);
    }
  });
});
