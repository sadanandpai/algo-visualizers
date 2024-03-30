import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useSetState } from 'react-use';

interface State {
  run: boolean;
  steps: Step[];
}

function AppTour() {
  const [{ run, steps }, setState] = useSetState<State>({
    run: false,
    steps: [
      {
        content: <h2>Let`&apos;s begin our journey!</h2>,
        locale: { skip: <strong aria-label="skip">SKIP</strong> },
        placement: 'center',
        target: 'body',
      },
      {
        content: <h2>Select the alogrithm to make patterns</h2>,
        placement: 'right',
        target: '.selectMaze',
      },
      {
        content: <h2>Choose the speed</h2>,
        target: '.selectSpeed',
      },
      {
        content: <h2>It will Start making pattern</h2>,
        target: '.buildPattern',
      },
      {
        content: <h2>Choose the alogrithm for finding the path</h2>,
        target: '.selectAlgo',
      },
      {
        content: <h2>It will show visited cells</h2>,
        target: '.visitedCell',
      },
      {
        content: <h2>It will show the path length count</h2>,
        target: '.pathLength',
      },
      {
        content: <h2>It will show time taken by Algorithm</h2>,
        target: '.timeTaken',
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

      <button
        onClick={handleClickStart}
        className="border border-gray-400 rounded px-1 mx-2 hover:border-gray-500 hidden"
      >
        Take Tour
      </button>
    </>
  );
}

export default AppTour;
