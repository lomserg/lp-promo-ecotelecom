// import { createElement, createAndAppendElement } from "../utils/createElement";
// import Swiper from "swiper";
// import { Navigation, Pagination } from "swiper/modules";
// // import Swiper JS

// Swiper.use([Navigation]);
// Swiper.use([Pagination]);
// // import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "./slider.css";

// const sliderContainer = createElement("div", { className: "slider-container" });
// const swiperContainer = createElement("div", { className: "swiper-container" });
// const swiperWrapper = createElement("div", { className: "swiper-wrapper" });
// const swiperPagination = createElement("div", {
//   className: "swiper-pagination",
// });
// const swiperButtinNext = createElement("div", {
//   className: "swiper-button-next",
// });
// const swiperButtinPrev = createElement("div", {
//   className: "swiper-button-prev",
// });
// // <div class="swiper-button-prev"></div>
// // <div class="swiper-button-next"></div>
// createAndAppendElement(swiperWrapper, "div", {
//   className: "swiper-slide card",
// });
// createAndAppendElement(swiperWrapper, "div", {
//   className: "swiper-slide card",
// });
// createAndAppendElement(swiperWrapper, "div", {
//   className: "swiper-slide card",
// });
// createAndAppendElement(swiperWrapper, "div", {
//   className: "swiper-slide card",
// });
// createAndAppendElement(swiperWrapper, "div", {
//   className: "swiper-slide card",
// });
// swiperContainer.appendChild(swiperWrapper);
// swiperContainer.appendChild(swiperPagination);
// swiperContainer.appendChild(swiperButtinNext);
// swiperContainer.appendChild(swiperButtinPrev);

// sliderContainer.appendChild(swiperContainer);

// // const swiper = new Swiper(swiperContainer, {
// //   modules: [Navigation, Pagination],
// //   loop: false,
// //   grabCursor: true,
// //   pagination: {
// //     el: ".swiper-pagination",
// //     clickable: false,
// //   },

// //   navigation: {
// //     nextEl: ".swiper-button-next",
// //     prevEl: ".swiper-button-prev",
// //   },
// //   cssMode: true,
// //   allowTouchMove: true,
// //   freeMode: true,
// //   noSwiping: false,
// //   spaceBetween: 20,
// //   breakpoints: {
// //     0: {
// //       slidesPerView: 1.15,
// //     },
// //     550: {
// //       slidesPerView: 1.9,
// //     },
// //     768: {
// //       slidesPerView: 3,
// //     },
// //     991: {
// //       slidesPerView: 3,
// //     },
// //   },
// // });
// const swiper = new Swiper(swiperContainer, {
//   // Optional parameters
//   loop: true,
//   autoplay: true,
//   pagination: {
//     el: ".swiper-pagination",
//   },

//   // // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });
// export { sliderContainer, swiperContainer };
