import "./style.css";
import Tarifs from "./assets/data/tarif-class";
import tarifData from "./assets/data/tarifs-data";
import ElementCreator from "./assets/utils/create-element";

const INTERNET = {
  tag: "div",
  classNames: "intenet",
};
const TV = {
  tag: "div",
  classNames: "intenet-tv",
};
const inetElement = new ElementCreator(INTERNET);
const tvElement = new ElementCreator(TV);
const divtvElement = tvElement.getElement() as HTMLDivElement;
const divinetElement = inetElement.getElement() as HTMLDivElement;
const body: HTMLBodyElement = document.querySelector("body")!;
body.append(divtvElement, divinetElement);
// const internet: HTMLDivElement = document.querySelector(".internet")!;

const tarifInternet = new Tarifs(tarifData, "cards", divinetElement, false);
const tarifInternetTv = new Tarifs(tarifData, "cards", divtvElement, true);
// tarifCardTv.populate();
// tarifCard.populate();
//tarifInternet.populate();
tarifInternetTv.populate();
tarifInternet.populate();
// console.log(tarifInternetTv.populate());
// console.log(tarifInternet.getHtml);
