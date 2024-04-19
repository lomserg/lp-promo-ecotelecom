import { TarifType } from "./tarifs-data";
import ElementCreator from "../utils/create-element";
import { Params } from "../utils/create-element";
import Swiper from "swiper";
import ModalTest from "../../utils/modal/modal-form";
import ModalNew from "../modal/modal";

interface TvChannelsParams {
  dataPackage: string;
  channels: string;
}
class TvChannels {
  divElement: HTMLDivElement;

  constructor(
    dataPackage: string | null,
    channels: string | null,
    onClick: () => void
  ) {
    // Convert null values to empty strings
    const pkg = dataPackage || "";
    const chnls = channels || "";

    const classNames = ["tarif", "channels-item"];

    // Create the div element
    this.divElement = document.createElement("div");
    this.divElement.classList.add(...classNames);

    // Set attributes for the div element
    this.divElement.setAttribute("data-package", pkg);

    // Create the link element
    const linkElement = document.createElement("a");
    linkElement.classList.add("channels_link", "link", "trigger");
    linkElement.textContent = chnls ? `${chnls} ТВ-каналов` : "";
    linkElement.href = "#channels";

    // Append the link element to the div
    this.divElement.appendChild(linkElement);
    // Add event listener to the link element
    linkElement.addEventListener("click", onClick);
  }
}

class Modal extends ElementCreator {
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement, text: string, params: Params) {
    super(params);
    this.parentElement = parentElement;
    this.setTextContent(text); // Set text content with the tarif name
  }

  createElement(param: Params) {
    // Override createElement method to handle modal creation differently
    this.element = document.createElement("div");
    this.element.classList.add("modal");
    this.element.textContent = param.textContent || ""; // Use textContent from params
  }

  open() {
    if (this.element) {
      this.element.classList.add("open");
      this.parentElement.appendChild(this.element);
    }
  }

  close() {
    if (this.element) {
      this.element.classList.remove("open");
      this.parentElement.removeChild(this.element);
    }
  }
}

const CARD = {
  tag: "div",
  classNames: ["card", "swiper-slide"],
};
const CONTAINER = {
  tag: "div",
  classNames: "swiper",
};

export default class Tarifs {
  // Properties
  data: TarifType[];
  classNames: string | string[]; // Assuming classNames is an array of strings
  parentElement: HTMLElement;
  modal: Modal | null;
  tv: boolean;
  swiperClassName: string;
  // Constructor
  constructor(
    data: TarifType[],
    classNames: string | string[],
    parentElement: HTMLElement,
    tv: boolean,
    swiperClassName: string
  ) {
    this.data = data;
    this.classNames = classNames;
    this.parentElement = parentElement;
    this.modal = null;
    this.tv = tv;
    this.swiperClassName = swiperClassName;
    this.populate();
  }

  populate() {
    // Create Swiper container
    const swiperContainer = new ElementCreator(CONTAINER);
    const swiperElem = swiperContainer.getElement() as HTMLDivElement;

    // Create Swiper wrapper
    const swiperWrapper = new ElementCreator({
      tag: "div",
      classNames: "swiper-wrapper",
    });
    const swiperWrapperElem = swiperWrapper.getElement() as HTMLDivElement;

    // Append swiper wrapper to swiper container
    swiperElem.appendChild(swiperWrapperElem);

    // Populate cards within swiper wrapper
    let hasCards = false; // Track if any cards are appended
    this.data.forEach((tarif) => {
      const card = new ElementCreator(CARD);
      if (card) {
        const cardElem: HTMLDivElement = card.getElement() as HTMLDivElement;

        const button = new ElementCreator({
          tag: "button",
          classNames: "tarif-button",
          textContent: "Подключить",
        }).getElement() as HTMLButtonElement;

        const tarifName = new ElementCreator({
          tag: "div",
          classNames: "tarif-name",
          textContent: tarif.name,
        }).getElement() as HTMLDivElement;

        const tarifSpeed = new ElementCreator({
          tag: "p",
          classNames: "tarif-speed",
          textContent: tarif.speed.toString() + " " + "Мбит/c",
        }).getElement() as HTMLParagraphElement;

        const tarifPrice = new ElementCreator({
          tag: "p",
          classNames: "tarif-price",
          textContent: tarif.price.toString() + " " + "Руб/мес",
        }).getElement() as HTMLParagraphElement;

        const tarifDescription = new ElementCreator({
          tag: "div",
          classNames: "tarif-description",
          textContent: tarif.description,
        }).getElement() as HTMLDivElement;

        // Check if the tarif matches the TV option and has channels and dataPackage
        if (
          (this.tv === tarif.tv && tarif.channels && tarif.dataPackage) ||
          (!this.tv && !tarif.tv)
        ) {
          // Create TvChannels instance only if tarif.channels is not null
          if (tarif.channels !== null) {
            const tvChannels = new TvChannels(
              tarif.dataPackage,
              tarif.channels,
              () => {
                // Create modal with channels list
                const channelListModal = new ModalNew("channelList");
                channelListModal.modalElement?.classList.add("open");
                this.parentElement.appendChild(channelListModal.modalElement!);
              }
            );

            // Append tarifSpeed, tvChannels, and other elements to cardElem
            cardElem.append(
              tarifName,
              tarifPrice,
              tarifSpeed,
              tvChannels.divElement,
              tarifDescription,
              button
            );
          } else {
            // Append other elements excluding tvChannels
            cardElem.append(
              tarifName,
              tarifPrice,
              tarifSpeed,
              tarifDescription,
              button
            );
          }

          // Add event listener to the button
          button.addEventListener("click", () => {
            const modal = new ModalTest();
            modal.create();
            modal.open();
          });

          swiperWrapperElem.appendChild(cardElem);
          hasCards = true; // Set flag to true if a card is appended
        }
      }
    });

    // Check if any cards were appended, if not, remove swiper container
    if (!hasCards) {
      swiperElem.remove();
    } else {
      // Append swiper container to the parent element
      this.parentElement.appendChild(swiperElem);

      // Initialize Swiper
      const swiper = new Swiper(swiperElem, {
        // Your Swiper options here
        slidesPerView: 3,
        spaceBetween: 5,
        loop: false,
      });
    }
  }
}
