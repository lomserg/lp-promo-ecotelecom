import "./style.css"; // Your main CSS styles
import getFaqData from "./faq/faq"; // If you have an FAQ section
import heroSection from "./hero/hero"; // Assuming you have a hero section
import getTarifsData from "./tarifs/tarifs";
// import { swiperContainer, sliderContainer } from "./slider/slider";
const appElement = document.querySelector<HTMLDivElement>("#app");

if (appElement) {
  appElement.appendChild(heroSection);

  // appElement.appendChild(sliderContainer);
  const tariffsSection = document.createElement("section");
  tariffsSection.classList.add("tarifs__section");
  appElement.appendChild(tariffsSection);

  getTarifsData(tariffsSection); // Load tariffs data
  getFaqData(); // Load FAQ data if applicable
} else {
  console.error("Element with ID 'app' not found.");
}
