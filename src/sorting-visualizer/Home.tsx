import AlgoDisplay from "./components/visualizer/AlgoDisplay";
import Controller from "./components/controller/Controller";
import Navbar from "@/sorting-visualizer/components/navbar/Navbar";
import classes from "./app.module.scss";
import { menuItems } from "./store/config";

function Home() {
  return (
    <>
      <Navbar menuItems={menuItems} />
      <Controller />
      <main className={classes.main}>
        <AlgoDisplay />
      </main>
    </>
  );
}

export default Home;
