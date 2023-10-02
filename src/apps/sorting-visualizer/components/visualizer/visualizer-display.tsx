import BarUI from '../bar/bar-ui';
import CellUI from '../cell/cell-ui';
import { UIProps } from '../../models/interfaces';
import { useAppSelector } from '@/store/hooks';

function VisualizerDisplay(props: UIProps) {
  const visualizerType = useAppSelector(
    (state) => state.sortViz.visualizerType
  );

  if (visualizerType === 'cell') {
    return <CellUI {...props} />;
  }

  if (visualizerType === 'bar') {
    return <BarUI {...props} />;
  }

  return null;
}

export default VisualizerDisplay;
