import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { Theme } from '@/types/interfaces';
import classes from './mode-icon.module.scss';
import { createPortal } from 'react-dom';
import moonIcon from '/icons/moon.svg';
import { setTheme } from '@/store/app.slice';
import sunIcon from '/icons/sun.svg';
import { useEffect } from 'react';

const SunIcon = <img src={sunIcon} alt="dark mode" />;
const MoonIcon = <img src={moonIcon} alt="dark mode" />;

function ModeIcon() {
  const dispatch = useAppDispatch();
  const storeTheme = useAppSelector((state) => state.app.theme);
  const prefTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT;
  const currentTheme = storeTheme ?? prefTheme;

  useEffect(() => {
    if (!storeTheme) {
      document.documentElement.setAttribute('data-theme', prefTheme);
    } else {
      dispatch(setTheme(storeTheme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {createPortal(
        <button
          className={classes.iconBtn}
          onClick={() =>
            dispatch(
              setTheme(currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
            )
          }
        >
          {currentTheme === Theme.LIGHT ? MoonIcon : SunIcon}
        </button>,
        document.getElementById('screen-layout')!
      )}
    </>
  );
}

export default ModeIcon;
