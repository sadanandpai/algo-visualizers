import { useJoyride } from 'react-joyride';
import classes from './app-tour.module.scss';
import { tourSteps } from './tour-data';

function AppTour() {
  const { controls, Tour } = useJoyride({
    continuous: true,
    steps: tourSteps,
    options: {
      zIndex: 100,
      width: '400px',
      buttons: ['back', 'close', 'primary', 'skip'],
    },
  });

  return (
    <>
      {Tour}

      <div className={classes.tourWrapper}>
        <button
          onClick={() => controls.start()}
          className={classes.tour}
        >
          Take Tour
        </button>

      </div>
    </>
  );
}

export default AppTour;
