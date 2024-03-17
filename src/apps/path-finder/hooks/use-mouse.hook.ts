import { useEffect, useRef, useState } from 'react';
import { CellElement, CellType } from '@pathFinder/models/interfaces';
import useMouseActions from '@pathFinder/hooks/use-mouse-actions.hook';
import { getCellDetails } from '@pathFinder/helpers/action.helper';

export function useMouse({
  isMobile,
  ref,
}: {
  isMobile: boolean;
  ref: React.RefObject<HTMLDivElement>;
}) {
  const [cell, setCell] = useState<CellElement | null>(null);
  const { element, isMouseDown } = useMouseActions({ isMobile, ref });
  const { isValidCell, selectedCell } = getCellDetails(element);
  const previousCellRef = useRef<CellElement | null>(null);
  const isEntryOrExitRef = useRef(false);

  useEffect(() => {
    if (!isValidCell) {
      return;
    }

    const isNew = !(
      previousCellRef.current?.col === selectedCell.col &&
      previousCellRef.current?.row === selectedCell.row
    );

    if (!isNew) {
      return;
    }

    if (isEntryOrExitRef.current && previousCellRef.current) {
      if (
        ![CellType.entry, CellType.exit, CellType.wall].includes(
          selectedCell.cellType
        )
      ) {
        setCell({
          ...selectedCell,
          cellType: previousCellRef.current.cellType,
        });
        previousCellRef.current = {
          ...selectedCell,
          cellType: previousCellRef.current.cellType,
        };
      }

      return;
    }

    if (![CellType.entry, CellType.exit].includes(selectedCell.cellType)) {
      setCell({
        row: selectedCell.row,
        col: selectedCell.col,
        cellType:
          selectedCell.cellType === CellType.wall
            ? CellType.clear
            : CellType.wall,
      });
      previousCellRef.current = selectedCell;
    }
  }, [isValidCell, selectedCell]);

  useEffect(() => {
    if (isMouseDown && selectedCell && !previousCellRef.current) {
      previousCellRef.current = selectedCell;
      isEntryOrExitRef.current = [CellType.entry, CellType.exit].includes(
        selectedCell.cellType
      );
    }

    if (!isMouseDown) {
      previousCellRef.current = null;
      isEntryOrExitRef.current = false;
    }
  }, [isMouseDown, selectedCell]);

  return cell;
}
