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
      const card: HTMLDivElement = document.createElement("div");
      const tarifName: HTMLDivElement = document.createElement("div");
      const tarifPrice: HTMLDivElement = document.createElement("div");
      const tarifDescription: HTMLDivElement = document.createElement("div");
      const button: HTMLButtonElement = document.createElement("button");
      if (this.tv && tarif.channels) {
        const tvChanels: HTMLParagraphElement = document.createElement("p");
        tvChanels.textContent = tarif.channels.toString();
        tarifName.textContent = tarif.name;
        tarifPrice.textContent = tarif.price.toString();
        tarifDescription.textContent = tarif.description;
        button.textContent = "Подключить";
        card.append(tarifName, tarifPrice, tarifDescription, tvChanels, button);
        this.parentElement.append(card);
      }

      // Add event listener to the button
      button.addEventListener("click", () => {
        // Create and open modal when button is clicked
        if (this.modal === null) {
          this.modal = new Modal(this.parentElement, tarif.name, {} as Params);
          this.modal.open();
        } else {
          this.modal.close();
          this.modal = new Modal(this.parentElement, tarif.name, {} as Params);
          this.modal.open();
        }
      });
    });
  }
}


         <script type="application/javascript" src="//tagmanager.andata.ru/api/v1/container/9b91d137-d2ac-4f60-8303-e5be7e7bbb96/published/code.js">            </script>           