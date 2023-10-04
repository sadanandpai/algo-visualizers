import { UIProps } from '@/apps/sorting-visualizer/models/interfaces';
import classes from './bar.module.scss';
import { useMemo } from 'react';

function BarUI({ array, sorts, highlights, pivot }: UIProps) {
  const max = useMemo(() => Math.max(...array), [array]);

  function getBarColor(idx: number) {
    let cellClass = '';

    if (pivot === idx) {
      cellClass = 'pivot';
    }

    if (sorts.includes(idx)) {
      cellClass = 'sort';
    }

    if (highlights.includes(idx)) {
      cellClass = 'highlight';
    }

    return cellClass;
  }

  return (
    <div className={classes.arrayContainer}>
      <ul className={classes.values} data-testid="bar-values">
        {array.map((item, idx) => (
          <li
            key={idx}
            className={classes[getBarColor(idx)]}
            style={{
              height: `${(item / max) * 100}%`,
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
