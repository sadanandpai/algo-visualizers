import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import { Theme } from '@/host/types/interfaces';
import classes from './theme-icon.module.scss';
import { createPortal } from 'react-dom';
import { setTheme } from '@/host/store/app.slice';
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

function ThemeIcon({
  top,
  left,
  bottom,
  right = 20,
}: {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}) {
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
          style={{ top, left, bottom, right }}
          onClick={() =>
            dispatch(
              setTheme(currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
            )
          }
        >
          {currentTheme === Theme.LIGHT ? <Moon /> : <Sun color="black" />}
        </button>,
        document.getElementById('screen-layout')!
      )}
    </>
  );
}

export default ThemeIcon;
