import tarifData, { TarifType } from "./tarifs-data";

class Modal {
  element: HTMLDivElement;
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement, text: string) {
    this.parentElement = parentElement;
    this.element = this.createModalElement(text);
  }

  createModalElement(text: string): HTMLDivElement {
    const modal: HTMLDivElement = document.createElement("div");
    modal.classList.add("modal");
    modal.textContent = `You clicked the button for ${text}!`; // Use text directly
    return modal;
  }

  open() {
    this.element.classList.add("open");
    this.parentElement.appendChild(this.element);
  }

  close() {
    this.element.classList.remove("open");
    this.parentElement.removeChild(this.element);
  }
}

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
    return this.data.map((tarif) => {
      if (this.tv && tarif.tv) {
      }
      const card: HTMLDivElement = document.createElement("div");
      const tarifName: HTMLDivElement = document.createElement("div");
      const tarifPrice: HTMLDivElement = document.createElement("div");
      if (this.tv && tarif.channels) {
        const tvChanels: HTMLParagraphElement = document.createElement("p");
        tvChanels.textContent = tarif.channels.toString();
        card.appendChild(tvChanels);
      }
      const tarifDescription: HTMLDivElement = document.createElement("div");
      const button: HTMLButtonElement = document.createElement("button");
      tarifName.textContent = tarif.name;
      tarifPrice.textContent = tarif.price.toString();
      tarifDescription.textContent = tarif.description;
      button.textContent = "Подключить";

      // Add event listener to the button
      button.addEventListener("click", () => {
        // Create and open modal when button is clicked
        if (this.modal === null) {
          this.modal = new Modal(this.parentElement, tarif.name);
          this.modal.open();
        } else {
          this.modal.close();
          this.modal = new Modal(this.parentElement, tarif.name);
          this.modal.open();
        }
      });

      card.append(tarifName, tarifPrice, tarifDescription, button);
      return card;
    });
  }
}
