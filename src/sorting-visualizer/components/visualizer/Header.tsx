import { useEffect, useRef } from "react";

import { HeaderProps } from "@/sorting-visualizer/models/interfaces";
import { useAppSelector } from "@/sorting-visualizer/hooks/hooks";

function Header({ algoName, isCompleted }: HeaderProps) {
  const time = useAppSelector((state) => state.app.time);
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
