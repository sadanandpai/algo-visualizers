import { algoList } from "../sorting-algorithms/algoList";

export const menuItems = algoList.map((item) => item.name).concat("all");
export const initialArray = [6, 8, 3, 5, 1, 9, 2, 7, 4];

export const selectedList = algoList.map((list) => {
  const{fn, ...rest} = list;

  return{...rest, selected: true}
});

export const cellCSS = {
  size: 50,
  margin: 4,
};

export const colors = {
  sort: "springgreen",
  highlight: "yellow",
  pivot: "orange",
};

const root = document.querySelector(":root") as HTMLElement;
root.style.setProperty("--cell-size", `${cellCSS.size}px`);
root.style.setProperty("--cell-margin", `${cellCSS.margin}px`);
