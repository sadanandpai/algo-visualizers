import { useEffect, useRef } from 'react';

import { HeaderProps } from '@/apps/sorting-visualizer/models/interfaces';
import { useAppSelector } from '@/store/hooks';

function Header({ algoName, isCompleted }: HeaderProps) {
  const time = useAppSelector((state) => state.sortViz.time);
  const completionTime = useRef(0);

  useEffect(() => {
    if (isCompleted) {
      completionTime.current = time;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  return (
    <header>
      <h2>{algoName} Sort</h2>
      <span>
        Time: <strong>{completionTime.current || time}</strong>
      </span>
    </header>
  );
}

export default Header;
