import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import Controller from "@/apps/sorting-visualizer/components/controller/controller";
import Navbar from "@/apps/sorting-visualizer/components/navbar/navbar";
import { Theme } from "@/types/interfaces";
import classes from "./layout.module.scss";
import { menuItems } from "@/apps/sorting-visualizer/config";
import moonIcon from "/icons/moon.svg";
import { setTheme } from "@/store/app.slice";
import sunIcon from "/icons/sun.svg";

const SunIcon = <img src={sunIcon} alt="dark mode" />;
const MoonIcon = <img src={moonIcon} alt="dark mode" />;

function MainLayout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const storeTheme = useAppSelector((state) => state.app.theme);
  const cssTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Theme.DARK
    : Theme.LIGHT;
  const currentTheme = storeTheme ?? cssTheme;

  useEffect(() => {
    dispatch(setTheme(currentTheme));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <Navbar menuItems={menuItems} />
      <Controller />
      <main className={classes.main}>
        {children}

        <button
          className={classes.iconBtn}
          onClick={() =>
            dispatch(
              setTheme(currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
            )
          }
        >
          {currentTheme === Theme.LIGHT ? SunIcon : MoonIcon}
        </button>
      </main>
    </div>
  );
}

export default MainLayout;
