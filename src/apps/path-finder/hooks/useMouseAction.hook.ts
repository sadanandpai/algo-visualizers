import { useEffect, useRef, useState } from 'react';

function useMouseAction(ref: React.RefObject<HTMLDivElement>) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const isMouseDown = useRef(false);

  useEffect(() => {
    const referenceEl = ref.current;
    if (!referenceEl) {
      return;
    }

    referenceEl.addEventListener('mousedown', onMouseDown);
    referenceEl.addEventListener('mousemove', onmouseMove);
    referenceEl.addEventListener('mouseup', onMouseUp);
    referenceEl.addEventListener('mouseleave', onMouseUp);

    return () => {
      referenceEl.removeEventListener('mousedown', onMouseDown);
      referenceEl.removeEventListener('mouseleave', onmouseMove);
      referenceEl.removeEventListener('mouseup', onMouseUp);
      referenceEl.removeEventListener('mouseleave', onMouseUp);
    };
  }, [ref]);

  const onMouseDown = (e: MouseEvent | TouchEvent) => {
    if (e.target) {
      isMouseDown.current = true;
      setElement(e.target as HTMLElement);
    }
  };

  const onmouseMove = (e: MouseEvent | TouchEvent) => {
    if (isMouseDown.current) {
      setElement(e.target as HTMLElement);
    }
  };

  const onMouseUp = () => {
    isMouseDown.current = false;
    setElement(null);
  };

  return { element, isMouseDown: isMouseDown.current };
}

export default useMouseAction;
