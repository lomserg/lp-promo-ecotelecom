import {
  createElement,
  //   createAndAppendElement,
} from "../../../utils/createElement";
import "./modal.css";
// <div class="bg-modal" id="pack-5b504edcb2de77e82f591f1a">
//   <button class="modal-btn">X</button>
//   <div id="modal" class="modal-content">
//     <div class="channels-list"></div>
//   </div>
// </div>;

const backgroundModal = createElement("div", {
  className: "bg-modal",
  id: "pack-5b504edcb2de77e82f591f1a",
});

const buttonModal = createElement("button", {
  className: "modal-btn",
  textContent: "X",
});

const modal = createElement("div", {
  className: "modal-content",
  id: "modal",
});

const channels = createElement("div", {
  className: "channels-list",
});
modal.appendChild(channels);

backgroundModal.append(buttonModal, modal);

export { backgroundModal };
