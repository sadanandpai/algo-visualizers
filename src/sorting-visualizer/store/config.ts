import { algoList } from "../sorting-algorithms/algoList";

export const menuItems = algoList.map((item) => item.name).concat("all");
