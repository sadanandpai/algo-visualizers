import { setCols, setRows } from "../../store/path-finder.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import React from "react";

function Dimension() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.pathFinder.rows);
  const cols = useAppSelector((state) => state.pathFinder.cols);

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRows(Number(event.target.value)));
  };

  const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCols(Number(event.target.value)));
  };

  return (
    <div>
      <label htmlFor="rows">Rows:</label>
      <input
        type="range"
        id="rows"
        min={1}
        max={10}
        value={rows}
        onChange={handleRowsChange}
      />

      <label htmlFor="cols">Cols:</label>
      <input
        type="range"
        id="cols"
        min={1}
        max={10}
        value={cols}
        onChange={handleColsChange}
      />
    </div>
  );
}

export default Dimension;
