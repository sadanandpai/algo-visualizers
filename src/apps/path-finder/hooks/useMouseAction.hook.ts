import { useEffect, useRef, useState } from "react";

function useMouseAction(ref: React.RefObject<HTMLDivElement>) {
  const [clickIdx, setClickIdx] = useState<{ row: number; col: number } | null>(
    null
  );
  const isMouseDown = useRef(false);

  const setClick = (el: HTMLElement) => {
    setClickIdx({
      row: +(el.dataset.row ?? -1),
      col: +(el.dataset.col ?? -1),
    });
  };

  useEffect(() => {
    const referenceEl = ref.current;
    if (!referenceEl) {
      return;
    }

    referenceEl.addEventListener("mousedown", onMouseDown);
    referenceEl.addEventListener("mousemove", onmouseMove);
    referenceEl.addEventListener("mouseup", onMouseUp);
    referenceEl.addEventListener("mouseleave", onMouseUp);

    return () => {
      referenceEl.removeEventListener("mousedown", onMouseDown);
      referenceEl.removeEventListener("mousemove", onmouseMove);
      referenceEl.removeEventListener("mouseup", onMouseUp);
      referenceEl.removeEventListener("mouseleave", onMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const onMouseDown = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el?.tagName === "BUTTON") {
      isMouseDown.current = true;
      setClick(el);
    }
  };

  const onmouseMove = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (isMouseDown.current && el?.tagName === "BUTTON") {
      setClick(el);
    }
  };

  const onMouseUp = () => {
    isMouseDown.current = false;
  };

  return clickIdx;
}

export default useMouseAction;
