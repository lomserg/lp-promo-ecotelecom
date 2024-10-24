import "./style.css";
import getFaqData from "./faq/faq";

const appElement = document.querySelector<HTMLDivElement>("#app");

// Ensure that appElement exists and is not null
if (appElement) {
  getFaqData();
} else {
  console.error("Element with ID 'app' not found.");
}
