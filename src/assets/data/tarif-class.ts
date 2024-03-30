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
      this.element = null; // Reset the element reference
    }
  }
}

export default class Tarifs {
  // Properties
  data: TarifType[];
  classNames: string | string[]; // Assuming classNames is an array of strings
  parentElement: HTMLElement;
  modal: Modal | null;
  tv: boolean;
  htmlElem: HTMLElement | null;
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
    this.htmlElem = this.createHtml();
  }

  createHtml(): HTMLElement {
    this.htmlElem = document.createElement("div");
    return this.htmlElem;
  }

  get getHtml(): HTMLElement {
    return this.htmlElem || document.createElement("div");
  }
  populate() {
    this.data.forEach((tarif) => {
      const card: HTMLDivElement = document.createElement("div");
      const tarifName: HTMLDivElement = document.createElement("div");
      const tarifPrice: HTMLDivElement = document.createElement("div");
      const tarifDescription: HTMLDivElement = document.createElement("div");
      const button: HTMLButtonElement = document.createElement("button");
      if (this.tv === tarif.tv && tarif.channels) {
        const tvChanels: HTMLParagraphElement = document.createElement("p");
        tvChanels.textContent = tarif.channels.toString();
        tarifName.textContent = tarif.name;
        tarifPrice.textContent = tarif.price.toString();
        tarifDescription.textContent = tarif.description;
        button.textContent = "Подключить";
        card.append(tarifName, tarifPrice, tarifDescription, tvChanels, button);
        console.log(card);
      }
      if (this.tv === false && tarif.tv === false) {
        tarifName.textContent = tarif.name;
        tarifPrice.textContent = tarif.price.toString();
        tarifDescription.textContent = tarif.description;
        button.textContent = "Подключить";
        card.append(tarifName, tarifPrice, tarifDescription, button);
        console.log(card);
      }
      if (card.children.length > 0) {
        this.parentElement.append(card);
      }

      // Add event listener to the button
      button.addEventListener("click", () => {
        if (this.modal === null || !this.modal.element) {
          this.modal = new Modal(this.parentElement, tarif.name, {} as Params);
          this.modal.open();
        } else {
          if (this.modal.element.classList.contains("open")) {
            this.modal.close(); // Close modal if it's open
          } else {
            // Get the tarif name associated with the clicked button's parent card
            const cardTarifName =
              card.querySelector(".tarif-name")?.textContent;
            this.modal = new Modal(
              this.parentElement,
              cardTarifName || "",
              {} as Params
            );
            this.modal.open(); // Open modal if it's closed
          }
        }
      });
    });
  }

  // readData() {
  //   this.data.forEach((tarif) => {
  //     if (tarif.tv === false) {
  //       console.log(tarif.name);
  //     } else {
  //       console.log(tarif.tv);
  //     }
  //   });
  // }
}
