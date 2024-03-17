import { useCallback, useEffect, useRef, useState } from 'react';
import { CellElement, CellType } from '@pathFinder/models/interfaces';
import { getCellDetails } from '@pathFinder/helpers/action.helper';

export function useTouch({
  isMobile,
  ref,
}: {
  isMobile: boolean;
  ref: React.RefObject<HTMLDivElement>;
}) {
  const [cell, setCell] = useState<CellElement | null>(null);
  const previousCellRef = useRef<CellElement | null>(null);

  const onClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isMobile) {
        return;
      }

      const target = e.target as HTMLElement;
      if (!target) {
        return;
      }

      const { isValidCell, selectedCell } = getCellDetails(target);
      if (!isValidCell) {
        return;
      }

      const cellType = selectedCell.cellType;
      const isEntryOrExit = [CellType.entry, CellType.exit].includes(cellType);
      if (isEntryOrExit) {
        previousCellRef.current = selectedCell;
        return;
      }

      if (
        ![CellType.entry, CellType.exit, CellType.wall].includes(
          selectedCell.cellType
        ) &&
        previousCellRef.current
      ) {
        setCell({
          ...selectedCell,
          cellType: previousCellRef.current.cellType,
        });
        previousCellRef.current = null;
        return;
      }

      setCell({
        ...selectedCell,
        cellType: cellType === CellType.wall ? CellType.clear : CellType.wall,
      });
      previousCellRef.current = null;
    },
    [isMobile]
  );

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const referenceEl = ref.current;
    if (!referenceEl) {
      return;
    }

    referenceEl.addEventListener('click', onClick);

    return () => {
      referenceEl.removeEventListener('mousedown', onClick);
    };
  }, [isMobile, onClick, ref]);

  return cell;
}
