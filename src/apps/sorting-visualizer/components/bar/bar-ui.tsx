import { memo, useMemo } from "react";

import { UIProps } from "@/apps/sorting-visualizer/models/interfaces";
import classes from "./bar.module.scss";
import { colors } from "@/apps/sorting-visualizer/config";

const BarUI = memo(function BarUI({
  array,
  sortPositions,
  highlightPositions,
  pivot,
}: UIProps) {
  function getBarColor(idx: number) {
    let backgroundColor = "";

    if (pivot === idx) {
      backgroundColor = colors.pivot;
    }

    if (highlightPositions.includes(idx)) {
      backgroundColor = colors.highlight;
    }

    if (sortPositions.includes(idx)) {
      backgroundColor = colors.sort;
    }

    return backgroundColor;
  }

  const max = useMemo(() => Math.max(...array), [array]);

  return (
    <div className={classes.arrayContainer}>
      {array.map((item, idx) => (
        <div
          key={idx}
          className={classes.bar}
          style={{
            height: `${(item / max) * 100}%`,
            backgroundColor: getBarColor(idx),
          }}
        ></div>
      ))}

      <div className={classes.indices}>
        {array.map((_, idx) => (
          <span key={idx}>{idx}</span>
        ))}
      </div>
    </div>
  );
});

export default BarUI;
