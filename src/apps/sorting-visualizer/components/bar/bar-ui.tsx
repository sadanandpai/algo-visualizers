import { UIProps } from "@/apps/sorting-visualizer/models/interfaces";
import classes from "./bar.module.scss";
import { colors } from "@/apps/sorting-visualizer/config";
import { useMemo } from "react";

function BarUI({ array, sortPositions, highlightPositions, pivot }: UIProps) {
  const max = useMemo(() => Math.max(...array), [array]);

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

  return (
    <div className={classes.arrayContainer}>
      <ul className={classes.values}>
        {array.map((item, idx) => (
          <li
            key={idx}
            style={{
              height: `${(item / max) * 100}%`,
              backgroundColor: getBarColor(idx),
            }}
          ></li>
        ))}
      </ul>

      <ul className={classes.indices}>
        {array.map((_, idx) => (
          <li key={idx}>{idx}</li>
        ))}
      </ul>
    </div>
  );
}

export default BarUI;
