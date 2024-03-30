import Controller from '@pathFinder/components/controller/controller';
import Grid from '@pathFinder/components/grid/grid';
import Navbar from '@/lib/components/navbar/navbar';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import CellInfo from '../components/cell-info/cell-info';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useSetState } from 'react-use';

interface State {
  run: boolean;
  steps: Step[];
}

function MainLayout() {
  const [{ run, steps }, setState] = useSetState<State>({
    run: false,
    steps: [
      {
        content: <h2>Let's begin our journey!</h2>,
        locale: { skip: <strong aria-label="skip">SKIP</strong> },
        placement: 'center',
        target: 'body',
      },
      {
        content: <h2>Select the alogrithm for pattern</h2>,
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
        content: <h2>It will reset the Pattern</h2>,
        target: '.resetPattern',
      },
      {
        content: <h2>Choose the alogrithm for finding sortest path</h2>,
        target: '.selectAlgo',
      },
      {
        content: <h2>Select speed</h2>,
        target: '.selectAlgoSpeed',
      },
      {
        content: <h2>Click to get shortest path</h2>,
        placement: 'left',

        target: '.startfindingPath',
      },
      {
        content: <h2>Reset the Path</h2>,
        placement: 'left',
        target: '.resetPath',
      },
      {
        content: <h2>It will show visited cells</h2>,
        target: '.visitedCell',
      },
      {
        content: <h2>It will show the shotest path length count</h2>,
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
            zIndex: 10000,
            width: '300px',
          },
        }}
      />
      <ThemeIcon top={10} right={20} />
      <Navbar title="Path Finder">
        <CellInfo handleClickStart={handleClickStart} />
      </Navbar>
      <Controller />
      <main className="text-center">
        <Grid />
      </main>
    </>
  );
}

export default MainLayout;
