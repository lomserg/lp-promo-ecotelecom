export default class ModalNew {
  modalType: string;
  modalElement: HTMLElement | null;

  constructor(modalType: string) {
    this.modalType = modalType;
    this.modalElement = this.createModal();
  }

  createModal() {
    this.modalElement = document.createElement("div");
    this.modalElement.classList.add("modal");
    this.checkType();
    return this.modalElement;
  }
  checkType() {
    if (this.modalType === "form") {
      this.form();
    }
  }
  form() {
    const inputName = document.createElement("input");
    const inputEmail = document.createElement("input");
    const inputPhone = document.createElement("input");
    const buttonSubmit = document.createElement("button");
    this.modalElement?.append(inputName, inputEmail, inputPhone);
  }

  //   channelModal() {
  //     return;
  //   }
}
