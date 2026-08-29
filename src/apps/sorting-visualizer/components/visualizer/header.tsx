import { useState } from 'react';

import { HeaderProps } from '@sortViz/models/interfaces';
import { useAppSelector } from '@/host/store/hooks';

function Header({ algoName, isCompleted }: HeaderProps) {
  const time = useAppSelector((state) => state.sortViz.time);
  const [frozenTime, setFrozenTime] = useState<number | null>(null);

  if (isCompleted && frozenTime === null) {
    setFrozenTime(time);
  }
  if (!isCompleted && frozenTime !== null) {
    setFrozenTime(null);
  }

  return (
    <header>
      <h2>{algoName} Sort</h2>
      <span>
        Time: <strong>{frozenTime ?? time}</strong>
      </span>
    </header>
  );
}

export default Header;
