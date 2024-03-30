import tarifData, { TarifType } from "./tarifs-data";
import ElementCreator from "../utils/create-element";
import { Params } from "../utils/create-element";

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

// const OPTIONS = {
//   tag: "p",
//   classNames: "tarif-options",
// };

// const BUTTON = {
//   tag: "button",
//   textContent: "Подключить",
// };

export default class Tarifs {
  // Properties
  data: TarifType[];
  classNames: string | string[]; // Assuming classNames is an array of strings
  parentElement: HTMLElement;
  modal: Modal | null;
  tv: boolean;
  // Constructor
  constructor(
    data: TarifType[],
    classNames: string | string[],
    parentElement: HTMLElement,
    tv: boolean
  ) {
    this.data = data;
    this.classNames = classNames;
    this.parentElement = parentElement;
    this.modal = null;
    this.tv = tv;
  }

  populate() {
    this.data.forEach((tarif) => {
      const card = new ElementCreator(CARD);
      if (card) {
        const cardElem: HTMLDivElement = card.getElement() as HTMLDivElement; // Asserting type to HTMLDivElement

        const button = new ElementCreator({
          tag: "button",
          classNames: "tarif-button",
          textContent: "Подключить",
        }).getElement() as HTMLButtonElement;

        if (this.tv === tarif.tv && tarif.channels) {
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

          // Check if this.tv and tarif.tv are both true
          const tvChannels = new ElementCreator({
            tag: "p",
            classNames: "tarif-channels",
            textContent: tarif.channels.toString() + " ТВ-каналов",
          }).getElement() as HTMLParagraphElement;

          cardElem.append(
            tarifName,
            tarifPrice,
            tarifSpeed,
            tvChannels,
            tarifDescription,
            button
          );
        }

        if (this.tv === false && tarif.tv === false) {
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
            tag: "div",
            classNames: "tarif-price",
            textContent: tarif.price.toString() + " руб.",
          }).getElement() as HTMLDivElement;

          const tarifDescription = new ElementCreator({
            tag: "div",
            classNames: "tarif-description",
            textContent: tarif.description,
          }).getElement() as HTMLDivElement;

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
          // Create and open modal when button is clicked
          if (this.modal === null) {
            this.modal = new Modal(
              this.parentElement,
              tarif.name,
              {} as Params
            );
            this.modal.open();
          } else {
            this.modal.close();
            this.modal = new Modal(
              this.parentElement,
              tarif.name,
              {} as Params
            );
            this.modal.open();
          }
        });
        if (cardElem.children.length > 0) {
          this.parentElement.append(cardElem);
        }
      }
    });
  }
}
