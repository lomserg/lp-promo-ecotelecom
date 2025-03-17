import "./card.css";
import { backgroundModal } from "./modal/modal";
import { createTarifPage } from "../createTarifPage";
// import { createTarifPage, loadTariffPage } from "../tarifsDetail";
// <div class="swiper-slide tarif-option">
// <div class="tarif-slider-description">
//   <!-- <div class="tarif-promo">Акция</div> -->
//   <!-- <div class="tarif-icon"></div> -->
//   <p class="tarif-name">СТАРТ</p>
//   <p class="tarif-price">
//     549 <span style="font-size: 0.75rem">₽/мес</span>
//   </p>

//   <div class="tarif-param">
//     <p class="tarif-speed">100 Мбит/с</p>
//   </div>

//   <button class="choose-btn">Выбрать</button>
// </div>
// </div>

// {
//   "name": "старт+кино",
//   "promo": true,
//   "speed": 100,
//   "price": 100,
//   "price2": null,
//   "description": "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
//   "tv": true,
//   "channels": 120,
//   "movie": null
// }
import {
  createAndAppendElement,
  createElement,
} from "../../utils/createElement";

interface Tariff {
  id: number;
  name: string;
  promo?: boolean;
  speed: number;
  price?: number;
  description: string;
  tv: boolean;
  dataPackage: string | null;
  channels: number;
  movie: string | null;
}

const makeCardItemElement = (cardItem: Tariff) => {
  const { id, name, price, speed, dataPackage, tv, channels, movie } = cardItem;
  // console.log(`Question: ${question}, Answer: ${answer}`);

  const swiperSlide = createElement("div", {
    className: "swiper-slide tarif-option",
  });

  const swiperSlideWraper = createElement("div", {
    className: "tarif-slider-description",
  });
  createAndAppendElement(swiperSlideWraper, "p", {
    className: "tarif-name",
    textContent: `${name}`,
  });
  const priceElement = createElement("p", {
    className: "tarif-price",
    textContent: `${price}`,
  });
  createAndAppendElement(priceElement, "span", {
    className: "span-price",
    textContent: ` ₽/мес`,
  });
  swiperSlideWraper.appendChild(priceElement);
  const tarifParam = createElement("div", {
    className: "tarif-param",
  });
  createAndAppendElement(tarifParam, "p", {
    className: "tarif-speed",
    textContent: `${speed}`,
  });
  createElement("div", {
    className: "tarif channels-item",
    dataPackage: `${speed}`,
  });
  if (tv === true) {
    const tvWraper = createElement("div", {
      className: "tarif channels-item",
      dataPackage: `${dataPackage}`,
    });
    const channelsLink = createElement("a", {
      className: "channels_link link trigger",
      href: "#channels",
      textContent: `${channels} ТВ-каналов`,
    });
    channelsLink.addEventListener("click", showChannels);
    tvWraper.appendChild(channelsLink);
    tarifParam.appendChild(tvWraper);
  }
  if (movie) {
    const tarifMovie = createElement("p", {
      className: "tarif-movie",
      textContent: `${movie}`,
    });
    tarifParam.appendChild(tarifMovie);
  }
  // const faqTogleBtnElement = document.createElement("button");

  swiperSlideWraper.appendChild(tarifParam);
  swiperSlide.appendChild(swiperSlideWraper);
  const button = createElement("button", {
    className: "choose-btn",
    textContent: "Выбрать",
  });
  button.addEventListener("click", () => {
    // Update the URL query string
    // const newUrl = `${window.location.pathname}?id=${id}`;
    // window.history.pushState({ id }, "", newUrl);
    console.log("click", id);
    // Load the detail dynamically
    history.pushState({}, "", `?id=${id}`);
    createTarifPage(id);
  });
  swiperSlideWraper.appendChild(button);
  return swiperSlide;
};

// const slideItem = makeCardItemElement({
//   name: "старт+кино",
//   promo: true,
//   speed: 100,
//   price: 100,
//   description:
//     "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
//   tv: true,
//   dataPackage: "630f5b1c944a765510046e89",
//   channels: 120,
//   movie: null,
// });
console.log(125 % 10);
export { makeCardItemElement };

// console.log(slideItem);

function showChannels() {
  if (!backgroundModal.classList.contains("active"))
    backgroundModal.classList.add("active");
  document.querySelector("#app")?.appendChild(backgroundModal);
  for (const child of backgroundModal.children) {
    console.log(child.className);
    if (child.className === "modal-content") {
      console.log(child.children[0]);
    }
  }
}

// listItem.addEventListener("click", async () => {
//   const success = await fetchPpokemon(pokemonID);
//   if (success) {
//     window.location.href = `./detail.html?id=${pokemonID}`;
//   }
// });
// listWrapper.appendChild(listItem);
// });
