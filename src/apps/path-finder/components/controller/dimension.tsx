import { resetGrid, setDimension } from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function Dimension() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.pathFinder.rows);
  const cols = useAppSelector((state) => state.pathFinder.cols);

  const handleDimensionChange = (obj: { rows?: number; cols?: number }) => {
    dispatch(setDimension(obj));
    dispatch(resetGrid());
  };

  return (
    <>
      <label htmlFor="rows">Rows:</label>
      <input
        type="range"
        id="rows"
        min={5}
        max={100}
        value={rows}
        onChange={(e) =>
          handleDimensionChange({ rows: Number(e.target.value) })
        }
      />

      <label htmlFor="cols">Cols:</label>
      <input
        type="range"
        id="cols"
        min={5}
        max={100}
        value={cols}
        onChange={(e) =>
          handleDimensionChange({ cols: Number(e.target.value) })
        }
      />
    </>
  );
}

export default Dimension;
