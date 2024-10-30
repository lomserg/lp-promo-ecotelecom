import "./card.css";
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

const makeCardItemElement = (cardItem: {
  name: string;
  promo?: boolean;
  speed: number;
  price?: number;
  description: string;
  tv?: boolean;
  dataPackage?: string | null;
  channels: number;
  movie: string | null;
}) => {
  const { name, price, speed, dataPackage, tv, channels } = cardItem;
  // console.log(`Question: ${question}, Answer: ${answer}`);

  const swiperSlide = createElement("div", {
    className: "swiper-slide tarif-option",
  });

  const swiperSlideWriper = createElement("div", {
    className: "tarif-slider-description",
  });
  createAndAppendElement(swiperSlideWriper, "p", {
    className: "tarif-name",
    textContent: `${name}`,
  });
  createAndAppendElement(swiperSlideWriper, "p", {
    className: "tarif-price",
    textContent: `${price}`,
  });
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
    createAndAppendElement(tvWraper, "a", {
      className: "channels_link link trigger",
      href: "#channels",
      textContent: `${channels} ТВ-каналов`,
    });
    tarifParam.appendChild(tvWraper);
  }

  // const faqTogleBtnElement = document.createElement("button");

  swiperSlideWriper.appendChild(tarifParam);
  swiperSlide.appendChild(swiperSlideWriper);
  createAndAppendElement(swiperSlideWriper, "button", {
    className: "choose-btn",
    textContent: "Выбрать",
  });
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
