import { SortAsyncGenerator } from './types';

export interface CellProps {
  order: number;
  animation?: string;
  value: number;
  isSorted?: boolean;
  isHighlighted?: boolean;
  isPivot?: boolean;
}

export interface MovingCellProps {
  originalOrder: number;
  order: number;
  value: number;
  isHighlighted?: boolean;
  isSwap?: boolean;
}

export interface UIProps {
  array: number[];
  swaps: number[];
  sorts: number[];
  highlights: number[];
  moves?: number[];
  pivot?: number;
}

export interface HeaderProps {
  algoName: string;
  isCompleted: boolean;
}

export interface NavbarProps {
  menuItems: string[];
}

export interface NumberGenProps {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface VisualizerProps {
  array: number[];
  algoName: string;
  algoFn: (array: number[]) => SortAsyncGenerator;
  onComplete: () => void;
}

export interface AppState {
  array: number[];
  visualizerType: 'cell' | 'bar';
  isPlaying: boolean | null;
  reset: boolean;
  time: number;
  speed: number;
  timeIntervalId: NodeJS.Timeout | null;
  selectedAlgosStatus: boolean[];
}
