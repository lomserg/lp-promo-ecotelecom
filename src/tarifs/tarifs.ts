import { makeCardItemElement } from "./card/card";
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
const section = document.createElement("div");
section.classList.add("tarifs__section");
const appElement = document.querySelector<HTMLDivElement>("#app");
appElement?.appendChild(section);

interface Tariff {
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

export default function getTarifsData(tariffsSection: HTMLElement) {
  const baseUrl = import.meta.env.BASE_URL || "/"; // Use the base URL from Vite env
  fetch(`${baseUrl}data/tarif.json`)
    .then((response) => response.json())
    .then((data: Tariff[]) => {
      const tarifTv = data.filter((tarif) => tarif.tv === true);
      const tarif = data.filter((tarif) => tarif.tv === false);
      makeTarif(tariffsSection, tarif); // Append to the tariffsSection
      makeTarif(tariffsSection, tarifTv); // You may want to create a separate section for TV tariffs
    })
    .catch((err) => console.log(err));
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

const makeTarif = (parenElement: HTMLElement, tarifData: Tariff[]) => {
  console.log(tarifData[0].tv);
  if (!tarifData.length) return;
  const container = makeTarifContainerElement();
  const wrapper = makeTarifWrapper(tarifData[0].tv);
  wrapper.classList.add("container");
  console.log(wrapper);
  tarifData.forEach((item) => {
    const faqItemElement = makeCardItemElement(item);
    container.append(faqItemElement);
  });
  wrapper.appendChild(container);
  parenElement.appendChild(wrapper);
  console.log(wrapper.classList[1]);
  // Add navigation buttons
  const nextButton = document.createElement("div");
  nextButton.classList.add("swiper-button-next");

  const prevButton = document.createElement("div");
  prevButton.classList.add("swiper-button-prev");
  const swiperPagination = document.createElement("div");
  swiperPagination.classList.add("swiper-pagination");

  wrapper.appendChild(swiperPagination);
  wrapper.appendChild(prevButton);
  wrapper.appendChild(nextButton);

  new Swiper(`.${wrapper.classList[1]}`, {
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
      // clickable: true,
    },

    navigation: {
      nextEl: `.${wrapper.classList[1]} .swiper-button-next`,
      prevEl: `.${wrapper.classList[1]} .swiper-button-prev`,
    },
  });
};
