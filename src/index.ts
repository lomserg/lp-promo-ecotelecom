import "./style.css";
import Tarifs from "./assets/data/tarif-class";
import tarifData from "./assets/data/tarifs-data";
import ElementCreator from "./assets/utils/create-element";

const INTERNETTV = {
  tag: "div",
  classNames: ["internet-tv", "swiper"],
};
const INTERNET = {
  tag: "div",
  classNames: ["internet", "swiper-wrapper"],
};
const internet = new ElementCreator(INTERNET);
const internettv = new ElementCreator(INTERNETTV);
const container = document.createElement("div");
const divInternetTv = internettv.getElement() as HTMLDivElement;
const divInternet = internet.getElement() as HTMLDivElement;
const body: HTMLBodyElement = document.querySelector("body")!;
container.classList.add("swiper");
container.append(divInternet);
body.append(container, divInternetTv);
const tarifsInternetTv = new Tarifs(tarifData, "cards", divInternetTv, true);
const tarifsInternet = new Tarifs(tarifData, "cards", divInternet, false);
tarifsInternet.populate();
//tarifsInternetTv.populate();
import Swiper from "swiper";
import "swiper/swiper-bundle.css"; // Import Swiper styles

// Assuming you have a div with class "swiper-container" in your HTML
const swiperContainer = document.querySelector(".swiper") as HTMLElement;

// Initialize Swiper
const swiper = new Swiper(swiperContainer, {
  // Swiper configuration options
  slidesPerView: 2,
  spaceBetween: 10,
  loop: false,
  // Add other options as needed
});
