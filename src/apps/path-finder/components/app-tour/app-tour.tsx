import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import classes from './app-tour.module.scss';
import { tourSteps } from './tour-data';
import { useState } from 'react';

function AppTour() {
  const [inProgress, setInProgress] = useState(false);

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setInProgress(true);
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(data.status)) {
      setInProgress(false);
    }
  };

  return (
    <>
      <div className="hidden">
        <Joyride
          callback={handleJoyrideCallback}
          continuous
          hideCloseButton
          run={inProgress}
          showProgress
          showSkipButton
          steps={tourSteps}
          styles={{
            options: {
              zIndex: 100,
              width: '400px',
            },
          }}
        />
      </div>

      <div className={classes.tourWrapper}>
        <button
          onClick={handleClickStart}
          className={classes.tour}
          disabled={inProgress}
        >
          Take Tour
        </button>
      </div>
    </>
  );
}

export default AppTour;
