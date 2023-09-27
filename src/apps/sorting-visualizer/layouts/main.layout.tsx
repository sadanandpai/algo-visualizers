import Controller from "../components/controller/controller";
import Navbar from "../components/navbar/navbar";
import { PropsWithChildren } from "react";
import classes from "./layout.module.scss";
import { menuItems } from "../config";

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
