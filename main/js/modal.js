const chanelBtns = document.querySelectorAll(".channels_link");
const modal = document.querySelector(".bg-modal");
modal.addEventListener("click", () => {
  modal.classList.remove("active");
  document.querySelector("body").classList.remove("my-body-noscroll-class");
});
const ultaKino = [];

chanelBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // let modals = document.querySelectorAll('.bg-modal')
    const currentlyModal = document.querySelector(".bg-modal");
    document.querySelector("body").classList.add("my-body-noscroll-class");
    currentlyModal.classList.add("active");
    const modalId2 = e.target.dataset.target;

    closeModal = document.querySelectorAll(".modal-btn");
    closeModal.forEach((link) => {
      link.addEventListener("click", () => {
        currentlyModal.classList.remove("active");

        document
          .querySelector("body")
          .classList.remove("my-body-noscroll-class");
      });
    });
  });
});
