import { useAppSelector } from '@/host/store/hooks';
import BarUI from '@sortViz/components/bar/bar-ui';
import CellUI from '@sortViz/components/cell/cell-ui';
import { UIProps } from '@sortViz/models/interfaces';

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
