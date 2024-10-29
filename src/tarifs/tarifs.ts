import { makeCardItemElement } from "./card/card";
const appElement = document.querySelector<HTMLDivElement>("#app");

interface Tariff {
  name: string;
  promo?: boolean;
  speed: number;
  price?: number;
  description: string;
  tv?: boolean;
  dataPackage: string | null;
  channels: number;
  movie: string | null;
}

export default function getTarifsData() {
  const baseUrl = import.meta.env.BASE_URL || "/"; // Use the base URL from Vite env
  fetch(`${baseUrl}data/tarif.json`)
    .then((response) => response.json())
    .then((data: Tariff[]) => {
      const tarifTv = data.filter((tarif) => tarif.tv === true);
      const tarif = data.filter((tarif) => tarif.tv === false);
      if (appElement) makeTarif(appElement, tarif);
    })
    .catch((err) => console.log(err));
}

const makeTarifContainerElement = () => {
  const swiperContainer = document.createElement("div");
  swiperContainer.classList.add("swiper-wrapper");
  return swiperContainer;
};

const makeTarif = (parenElement: HTMLDivElement, tarifData: Tariff[]) => {
  const container = makeTarifContainerElement();
  // console.log(faqItems);
  tarifData.forEach((item) => {
    const faqItemElement = makeCardItemElement(item);
    container.append(faqItemElement);
  });
  parenElement.appendChild(container);
};
