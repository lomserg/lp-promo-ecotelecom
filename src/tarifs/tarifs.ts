import { makeCardItemElement } from "./card/card";
import {
  initSlider,
  makeTarifContainerElement,
  makeTarifWrapper,
} from "./helperSliderFunc";

const section = document.createElement("div");
section.classList.add("tarifs__section");
const appElement = document.querySelector<HTMLDivElement>("#app");
appElement?.appendChild(section);

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

const makeTarif = (parenElement: HTMLElement, tarifData: Tariff[]) => {
  // console.log(tarifData[0].tv);
  if (!tarifData.length) return;
  const container = makeTarifContainerElement();
  const wrapper = makeTarifWrapper(tarifData[0].tv);
  // wrapper.classList.add("container");
  // console.log(wrapper);
  tarifData.forEach((item) => {
    const faqItemElement = makeCardItemElement(item);
    container.append(faqItemElement);
  });

  // console.log(wrapper.classList[1]);
  // Add navigation buttons
  const nextButton = document.createElement("div");
  nextButton.classList.add("swiper-button-next");

  const prevButton = document.createElement("div");
  prevButton.classList.add("swiper-button-prev");
  const swiperPagination = document.createElement("div");
  swiperPagination.classList.add("swiper-pagination");
  wrapper.append(prevButton, nextButton);
  wrapper.append(container, swiperPagination);
  parenElement.appendChild(wrapper);
  // wrapper.appendChild(swiperPagination);
  // wrapper.appendChild(prevButton);
  // wrapper.appendChild(nextButton);

  initSlider(wrapper.classList[1]);
};
