import Controller from "../components/controller/controller";
import Grid from "../components/grid/grid";
import Navbar from "../components/navbar/navbar";

function MainLayout() {
  return (
    <>
      <Navbar />

      <Controller />

      <Grid />
    </>
  );
}

export default MainLayout;
