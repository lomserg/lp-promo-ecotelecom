import { headerContainer } from "./header/header";
import { createAndAppendElement, createElement } from "../utils/createElement";
import "./hero.css";
const heroSection = createElement("div", { className: "hero__bg" });
const heroWrapper = createElement("div", {
  className: ["hero__bg-container", "container"],
});
const heroCta = createElement("div", {
  className: "hero-txt-cta",
});
// left block
createAndAppendElement(heroCta, "h1", {
  className: "hero__bg-title",
  textContent: "РАЗУМНАЯ",
});

createAndAppendElement(heroCta, "h3", {
  className: "hero__bg-bigtitle",
  textContent: "ЭКОНОМИЯ",
});
createAndAppendElement(heroCta, "p", {
  className: "hero__title--sub",
  textContent: "12 МЕСЯЦЕВ ПО СПЕЦИАЛЬНОЙ ЦЕНЕ",
});
createAndAppendElement(heroCta, "a", {
  className: "btn",
  textContent: "Подробнее",
  href: "#tarif-block",
});

// right block
const heroImgWrapper = createElement("div", {
  className: "hero-img",
});

createAndAppendElement(heroImgWrapper, "img", {
  src: "/assets/images/family_s.png",
  alt: "re",
});
heroWrapper.appendChild(heroCta);
heroWrapper.appendChild(heroImgWrapper);
heroSection.appendChild(headerContainer);
heroSection.appendChild(heroWrapper);
export default heroSection;
