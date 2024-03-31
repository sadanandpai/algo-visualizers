import { Step } from 'react-joyride';
import mazeVideo from '/assets/maze.mp4';
import pathVideo from '/assets/path.mp4';

export const tourSteps: Step[] = [
  {
    content: (
      <>
        <h2>
          Click on the boxes or drag to clear or add wall. Move the entry/exit
          by dragging.
        </h2>
        <br />
        <video autoPlay loop muted>
          <source src={mazeVideo} type="video/mp4" />
        </video>
      </>
    ),
    locale: { skip: <strong aria-label="skip">SKIP</strong> },
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <h2>
        Or select the alogrithm to generate mazes.
        <br />
        Customize the speed & play/reset.
      </h2>
    ),
    placement: 'bottom',
    target: '.select-maze',
  },
  {
    content: (
      <h2>
        Choose an alogrithm for finding the path. <br />
        Customize the speed & play/reset.
      </h2>
    ),
    target: '.execution',
  },
  {
    content: <h2>Analyse the path search details & compare</h2>,
    target: '.path-info',
  },
  {
    content: (
      <>
        <h2>Move the entry/exit after search to see live results</h2>
        <br />
        <video autoPlay loop muted>
          <source src={pathVideo} type="video/mp4" />
        </video>
      </>
    ),
    placement: 'center',
    target: 'body',
  },
];
