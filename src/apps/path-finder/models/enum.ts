export const enum CellType {
  clear,
  entry,
  exit,
  wall,
  visited,
  path,
}

export enum Status {
  Generating,
  Ready,
  Searching,
  Complete,
}

export enum Speed {
  Infinity = '∞',
  '4x' = '4x',
  '2x' = '2x',
  '1x' = '1x',
  '0.7x' = '0.7x',
  '0.5x' = '0.5x',
  '0.1x' = '0.1x',
}
