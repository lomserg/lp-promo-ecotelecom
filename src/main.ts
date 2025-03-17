import "./style.css"; // Your main CSS styles
import "./channels.js";
import getFaqData from "./faq/faq"; // If you have an FAQ section
import heroSection from "./hero/hero"; // Assuming you have a hero section
import getTarifsData from "./tarifs/tarifs";
import { createSlider } from "./slider/slider";
import { createTarifPage, loadTariffsList } from "./tarifs/createTarifPage.js";
const appElement = document.querySelector<HTMLDivElement>("#app");

if (appElement) {
  appElement.appendChild(heroSection);

  createSlider();
  const tariffsSection = document.createElement("section");
  tariffsSection.classList.add("tarifs__section");
  appElement.appendChild(tariffsSection);

  getTarifsData(tariffsSection); // Load tariffs data
  getFaqData(); // Load FAQ data if applicable
} else {
  console.error("Element with ID 'app' not found.");
}
window.addEventListener("popstate", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id) {
    createTarifPage(Number(id)); // Load tariff details if `id` exists
  } else {
    loadTariffsList(); // Load main tariff list if no `id`
  }
});
