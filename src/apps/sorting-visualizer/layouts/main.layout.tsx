import Controller from "@/apps/sorting-visualizer/components/controller/controller";
import Navbar from "@/apps/sorting-visualizer/components/navbar/navbar";
import { PropsWithChildren } from "react";
import classes from "./layout.module.scss";
import { menuItems } from "@/apps/sorting-visualizer/config";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar menuItems={menuItems} />
      <Controller />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default MainLayout;
