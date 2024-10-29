import "./style.css";
import getFaqData from "./faq/faq";
import heroSection from "./hero/hero";
import { makeCardItemElement } from "./tarifs/card/card";
import getTarifsData from "./tarifs/tarifs";
const appElement = document.querySelector<HTMLDivElement>("#app");

// Ensure that appElement exists and is not null
if (appElement) {
  appElement.appendChild(heroSection);

  getTarifsData();
  getFaqData();
} else {
  console.error("Element with ID 'app' not found.");
}
