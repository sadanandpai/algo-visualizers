# Todo list NQueen Algorithm

## Features / Enhancements.

- Async generator wrapper which is independent of any alogorithm
  - This wrapper is driven only by play & pause button.
- Responsive design of the chessboard, so it occupies full screen.
- Config driven size for each cell of the chessboard.
- If the solution is invalid/completed, show it as toast message, instead of
  alert.
- Highlight all the 8 directions with different color _(maybe dark green color)_
  when we hover on the particular cell.
- Make use of webworkers for showing the multiple solutions.
  - Show all the possible arrangements for the given board size below the main
    visualization board.
  - If any solution board is clicked it will replace the main board and that
    solution is visualized.
- Add time of execution for each of the solution.
- Increase the size of board upto 16 queen.
- Create a new favicon for the project, currently it contains the vite icon.

## Optimisation

- Based on the queen position we need to do pruning.
  - **Example:**
    - If there is no queen in the lower rows, no need to do the checks for the
      lower diagonals.
