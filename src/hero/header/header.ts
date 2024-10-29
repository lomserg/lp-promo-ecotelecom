import {
  createElement,
  createAndAppendElement,
} from "../../utils/createElement";

const headerContainer = createElement("header", {
  className: ["header", "container"],
});

const headerWrapper = createElement("div", {
  className: "header-content",
});

createAndAppendElement(headerWrapper, "div", {
  className: "logo-header",
});

createAndAppendElement(headerWrapper, "a", {
  className: "phone",
  textContent: "+7 499 505-55-51",
  href: "tel:+74995055551",
});
headerContainer.appendChild(headerWrapper);
export { headerContainer };
// <header class="header container">
//   <div class="header-content">
//     <div class="logo-header"></div>
//     <div class="phone">
//       <a style="text-decoration: none" class="phoneid" href="tel:+74995055551">
//         +7 499 505-55-51
//       </a>
//     </div>
//   </div>
// </header>;
