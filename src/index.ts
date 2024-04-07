import "./style.css";
import Tarifs from "./assets/tarifs/tarif-class";
import tarifData from "./assets/tarifs/tarifs-data";
import ElementCreator from "./assets/utils/create-element";
import "swiper/swiper-bundle.css";
import Form from "./utils/form/form";

class App {
  constructor() {
    this.renderComponents();
  }

  renderComponents() {
    const INTERNETTV = {
      tag: "div",
      classNames: ["internet-tv"],
    };
    const INTERNET = {
      tag: "div",
      classNames: ["internet"],
    };

    const internet = new ElementCreator(INTERNET);
    const internettv = new ElementCreator(INTERNETTV);
    const container = document.createElement("div");
    const divInternetTv = internettv.getElement() as HTMLDivElement;
    const divInternet = internet.getElement() as HTMLDivElement;
    const body: HTMLBodyElement = document.querySelector("body")!;
    const form = new Form();
    body.append(divInternet, divInternetTv, form.getForm());
    const tarifsInternet = new Tarifs(
      tarifData,
      "cards",
      divInternet,
      false,
      "swiper-container-1"
    );
    const tarifsInternetTv = new Tarifs(
      tarifData,
      "cards",
      divInternetTv,
      true,
      "swiper-container-2"
    );
    //tarifsInternet.populate();
    // tarifsInternetTv.populate(); // Uncomment if needed
  }
}

new App();

