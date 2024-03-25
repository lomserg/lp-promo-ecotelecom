import "./style.css";
import Tarifs from "./assets/data/tarif-class";
import tarifData from "./assets/data/tarifs-data";
import ElementCreator from "./assets/utils/create-element";

const NEWBLOCK = {
  tag: "div",
  classNames: "intenet-tv",
};

const testElem = new ElementCreator(NEWBLOCK);
const divInternetTv = testElem.getElement() as HTMLDivElement;
const body: HTMLBodyElement = document.querySelector("body")!;
body.append(divInternetTv);
const internet: HTMLDivElement = document.querySelector(".internet")!;

const tarifCard = new Tarifs(tarifData, "cards", divInternetTv, true);
tarifCard.populate();
