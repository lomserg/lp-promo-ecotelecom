import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper JS

Swiper.use([Navigation]);
Swiper.use([Pagination]);
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function initSlider(wrapperClass: string) {
  new Swiper(`.${wrapperClass}`, {
    loop: false,
    grabCursor: true,
    // cssMode: true,
    //allowTouchMove: true,
    //  freeMode: true,
    noSwiping: false,
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1.15,
      },
      550: {
        slidesPerView: 1.9,
      },
      768: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: `.${wrapperClass} .swiper-button-next`,
      prevEl: `.${wrapperClass} .swiper-button-prev`,
    },
  });
}
const makeTarifContainerElement = () => {
  const swiperContainer = document.createElement("div");
  swiperContainer.classList.add("swiper-wrapper");
  return swiperContainer;
};

const makeTarifWrapper = (isTv: boolean) => {
  const swiperClass = isTv
    ? "tarifs-slider-container2"
    : "tarifs-slider-container";

  const tarifWrapper = document.createElement("div");
  tarifWrapper.classList.add("swiper");
  tarifWrapper.classList.add(swiperClass);
  return tarifWrapper;
};

export { initSlider, makeTarifContainerElement, makeTarifWrapper };
