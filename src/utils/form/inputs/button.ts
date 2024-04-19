import ModalTest from "../../modal/modal-form";

export default class Button {
  el: HTMLButtonElement;
  textContent: string;

  constructor(textContent: string) {
    this.el = document.createElement("button");
    this.textContent = textContent;
    this.eventHandler = this.eventHandler.bind(this);
    this.el.addEventListener("click", this.eventHandler);
    this.render();
  }

  returnElement() {
    return this.el;
  }
  render() {
    this.el.textContent = this.textContent;
    this.el.setAttribute("type", "submit");
    this.el.classList.add("btn");
  }
  eventHandler(event: MouseEvent) {
    event.preventDefault();
    console.log("Button clicked");
    console.log("Event:", event);
  }
}
