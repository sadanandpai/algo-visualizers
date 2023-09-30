import { algoList } from "./sorting-algorithms/algo-list";

export const menuItems = algoList.map((item) => item.name).concat("all");
export const initialArray = [6, 8, 3, 5, 1, 9, 2, 7, 4];

export const cellCSS = {
  size: 50,
  margin: 4,
};

export const barCSS = {
  size: 30,
  minSize: 10,
  margin: 1,
};

export const colors = {
  sort: "limegreen",
  highlight: "yellow",
  pivot: "orange",
  bar: "lightgrey",
};

export const selectedAlgosStatus = algoList.map(() => true);

const root = document.querySelector(":root") as HTMLElement;
root.style.setProperty("--cell-size", `${cellCSS.size}px`);
root.style.setProperty("--cell-margin", `${cellCSS.margin}px`);
root.style.setProperty("--bar-bg", `${colors.bar}`);
root.style.setProperty("--bar-size", `${barCSS.size}px`);
root.style.setProperty("--bar-min-size", `${barCSS.minSize}px`);
root.style.setProperty("--bar-margin", `${barCSS.margin}px`);
