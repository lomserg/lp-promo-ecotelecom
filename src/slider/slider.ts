import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";

function createSlider() {
  const sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider-container");

  const swiperContainer = document.createElement("div");
  swiperContainer.classList.add("swiper", "swiper-test", "unique-swiper");

  const swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");

  const swiperPagination = document.createElement("div");
  swiperPagination.classList.add("swiper-pagination");

  const swiperButtonNext = document.createElement("div");
  swiperButtonNext.classList.add("swiper-button-next");

  const swiperButtonPrev = document.createElement("div");
  swiperButtonPrev.classList.add("swiper-button-prev");

  // Create slides
  const slides = Array.from({ length: 4 }).map(() => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide", "card");
    return slide;
  });

  slides.forEach((slide) => swiperWrapper.appendChild(slide));

  // Append elements to build Swiper structure
  swiperContainer.appendChild(swiperWrapper);
  swiperContainer.appendChild(swiperPagination);
  swiperContainer.appendChild(swiperButtonNext);
  swiperContainer.appendChild(swiperButtonPrev);
  sliderContainer.appendChild(swiperContainer);

  // Append `sliderContainer` to the DOM
  //   document.body.appendChild(sliderContainer);

  // Initialize Swiper after elements are added to the DOM
  new Swiper(".unique-swiper", {
    modules: [Navigation, Pagination],
    loop: false,
    grabCursor: true,
    spaceBetween: 20,
    breakpoints: {
      0: { slidesPerView: 1.15 },
      550: { slidesPerView: 1.9 },
      768: { slidesPerView: 3 },
      991: { slidesPerView: 3.3 },
    },
    pagination: {
      el: ".unique-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".unique-swiper .swiper-button-next",
      prevEl: ".unique-swiper .swiper-button-prev",
    },
  });

  return sliderContainer;
}

const mySlider = new Promise((resolve) => {
  const slider = createSlider();
  document.body.appendChild(slider);
  resolve(slider);
});
mySlider.then(() => {
  new Swiper(".unique-swiper", {
    modules: [Navigation, Pagination],
    loop: false,
    grabCursor: true,
    spaceBetween: 20,
    breakpoints: {
      0: { slidesPerView: 1.15 },
      550: { slidesPerView: 1.9 },
      768: { slidesPerView: 3 },
      991: { slidesPerView: 3.3 },
    },
    pagination: {
      el: ".unique-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".unique-swiper .swiper-button-next",
      prevEl: ".unique-swiper .swiper-button-prev",
    },
  });
});
export { createSlider };
