export default class ModalNew {
  modalType: string;
  modalElement: HTMLElement | null;

  constructor(modalType: string) {
    this.modalType = modalType;
    this.modalElement = this.createModal();
  }

  createModal() {
    this.modalElement = document.createElement("div");
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    this.modalElement.classList.add("modal-bg");
    this.modalElement.append(modalContent);
    this.checkType();
    return this.modalElement;
  }

  checkType() {
    if (this.modalType === "form") {
      this.form();
    } else if (this.modalType === "channelList") {
      this.channelList();
    }
  }

  form() {
    const inputName = document.createElement("input");
    const inputEmail = document.createElement("input");
    const inputPhone = document.createElement("input");
    const buttonSubmit = document.createElement("button");
    this.modalElement?.append(inputName, inputEmail, inputPhone, buttonSubmit);
  }

  channelList() {
    // Create the channels list
    const channelsListDiv = document.createElement("div");
    channelsListDiv.classList.add("channels-list");

    this.modalElement?.firstChild?.appendChild(channelsListDiv);
  }
}
