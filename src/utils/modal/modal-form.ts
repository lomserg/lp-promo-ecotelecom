import "./modal.css";
import Form from "../form/form";
export default class ModalTest {
  el: HTMLDivElement | null;
  constructor() {
    this.el = null;
  }

  create() {
    this.el = document.createElement("div");
    const closeButton = document.createElement("button");
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    this.el.classList.add("bg-modal");
    closeButton.classList.add("modal-btn");
    closeButton.textContent = "Х";
    closeButton.addEventListener("click", this.close.bind(this));
    modalContent.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    this.el.addEventListener("click", this.close.bind(this));
    const form = new Form();
    modalContent.append(form.getForm());
    this.el.append(closeButton, modalContent);
  }

  open() {
    const body = document.querySelector("body");
    if (this.el) {
      body?.append(this.el);
      this.el.classList.add("active");
    }
  }

  close(event: MouseEvent) {
    event.stopPropagation(); // Stop event propagation
    const body = document.querySelector("body");
    if (this.el) body?.removeChild(this.el);
  }
}
