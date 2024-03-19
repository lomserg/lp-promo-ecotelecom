import "./style.css";
import Tarifs from "./assets/data/tarif-class";
import tarifData from "./assets/data/tarifs-data";

const body = document.querySelector("body")!;

const tarifCard = new Tarifs(tarifData, "cards", body, false);

const tarifElements = tarifCard.populate();

// Append each tarif element to the body
tarifElements.forEach((element) => {
  body.appendChild(element);
});
