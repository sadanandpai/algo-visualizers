import { RootState } from '@/host/store/store';
import { useSelector } from 'react-redux';

const VisitedCellCount = () => {
  const visitedCellCount = useSelector(
    (state: RootState) => state.pathFinder.visitedCellCount
  );
  console.log(visitedCellCount);
  return (
    <div>
      Visited Cell: <strong>{visitedCellCount}</strong>
    </div>
  );
};

export default VisitedCellCount;
