import { CellElement } from '@pathFinder/models';

type CellDetails =
  | {
      isValidCell: false;
      selectedCell?: null;
    }
  | {
      isValidCell: true;
      selectedCell: CellElement;
    };

export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function getCellDetails(element: HTMLElement | null): CellDetails {
  if (!element) {
    return { isValidCell: false };
  }

  if (element.tagName !== 'BUTTON') {
    return { isValidCell: false };
  }

  const row = Number(element.dataset.row ?? -1);
  const col = Number(element.dataset.col ?? -1);
  const cellType = Number(element.dataset.cellType ?? -1);

  if (row === -1 || col === -1 || cellType === -1) {
    return { isValidCell: false };
  }

  return {
    isValidCell: true,
    selectedCell: { row, col, cellType },
  };
}
