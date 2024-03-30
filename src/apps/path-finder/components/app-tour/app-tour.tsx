import { useSetState } from 'react-use';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import classes from './app-tour.module.scss';
import mazeVideo from '/assets/maze.mp4';
import pathVideo from '/assets/path.mp4';

interface State {
  run: boolean;
  steps: Step[];
}

function AppTour() {
  const [{ run, steps }, setState] = useSetState<State>({
    run: false,
    steps: [
      {
        content: (
          <>
            <h2>
              You can click on the boxes or drag to add walls & clear them. Move
              the start/end as per your wish
            </h2>
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
            Or you can select the alogrithm to generate mazes.
            <br />
            Customize the speed & play/reset as many times you wish.
          </h2>
        ),
        placement: 'bottom',
        target: '.select-maze',
      },
      {
        content: <h2>Choose the alogrithm for finding the path</h2>,
        target: '.execution',
      },
      {
        content: <h2>Analyse the path search details & compare</h2>,
        target: '.path-info',
      },
      {
        content: (
          <>
            <h2>You can move the start/end after search to see live results</h2>
            <video autoPlay loop muted>
              <source src={pathVideo} type="video/mp4" />
            </video>
          </>
        ),
        placement: 'center',
        target: 'body',
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setState({
      run: true,
    });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }
  };

  return (
    <>
      <div className="hidden">
        <Joyride
          callback={handleJoyrideCallback}
          continuous
          hideCloseButton
          run={run}
          showProgress
          showSkipButton
          steps={steps}
          styles={{
            options: {
              zIndex: 100,
              width: '300px',
            },
          }}
        />
      </div>

      <button onClick={handleClickStart} className={classes.tour}>
        Take Tour
      </button>
    </>
  );
}

export default AppTour;
