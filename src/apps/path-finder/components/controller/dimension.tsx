import {
  maxCols,
  maxRows,
  resetGrid,
  setDimension,
} from '../../store/path-finder.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useDebounce, useWindowSize } from 'react-use';

import { getDimensionsFromScrenSize } from '../../helpers/grid';

function Dimension() {
  const dispatch = useAppDispatch();
  const { width, height } = useWindowSize();
  const rows = useAppSelector((state) => state.pathFinder.rows);
  const cols = useAppSelector((state) => state.pathFinder.cols);

  useDebounce(
    () => {
      const maxDimension = getDimensionsFromScrenSize();
      if (maxDimension.maxRows === rows && maxDimension.maxCols === cols) {
        return;
      }

      dispatch(
        setDimension({ rows: maxDimension.maxRows, cols: maxDimension.maxCols })
      );
      dispatch(resetGrid());
    },
    333,
    [width, height]
  );

  const handleDimensionChange = (dimension: {
    rows?: number;
    cols?: number;
  }) => {
    if (dimension.rows && dimension.rows > maxRows) {
      return;
    }

    if (dimension.cols && dimension.cols > maxCols) {
      return;
    }

    dispatch(setDimension(dimension));
    dispatch(resetGrid());
  };

  return (
    <div>
      <label htmlFor="rows">Rows:</label>
      <input
        type="range"
        id="rows"
        min={5}
        max={80}
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
        max={80}
        value={cols}
        onChange={(e) =>
          handleDimensionChange({ cols: Number(e.target.value) })
        }
      />
    </div>
  );
}

export default Dimension;
