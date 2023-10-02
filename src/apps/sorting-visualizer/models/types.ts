export type SortAsyncGenerator = AsyncGenerator<
  | {
      type: 'swap' | 'highlight' | 'move';
      positions: number[];
    }
  | {
      type: 'sort' | 'pivot';
      position: number;
    },
  void | number,
  unknown
>;
