import Controller from "../components/controller/Controller";
import Navbar from "../components/navbar/Navbar";
import { PropsWithChildren } from "react";
import classes from "./layout.module.scss";
import { menuItems } from "../store/config";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar menuItems={menuItems} />
      <Controller />
      <main className={classes.main}>{children}</main>
    </>
  );
}

export default MainLayout;
