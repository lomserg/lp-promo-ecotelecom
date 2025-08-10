const chanelBtns = document.querySelectorAll(".channels_link");

// const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

// accordionItemHeaders.forEach(accordionItemHeader => {
//     accordionItemHeader.addEventListener("click", event => {

//         // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

//         const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
//         if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
//           currentlyActiveAccordionItemHeader.classList.toggle("active");
//           currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
//         }

//         accordionItemHeader.classList.toggle("active");
//         const accordionItemBody = accordionItemHeader.nextElementSibling;
//         if (accordionItemHeader.classList.contains("active")) {
//             accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
//         }
//         else {
//             accordionItemBody.style.maxHeight = 0;
//         }

//     });
// });

chanelBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // let modals = document.querySelectorAll('.bg-modal')
    let modalId = e.target.dataset.target;
    let getModal = document.getElementById(modalId);
    getModal.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%"; // ADD THIS LINE
    closeModal = document.querySelectorAll(".modal-btn");
    closeModal.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        getModal.classList.remove("active");
        document.body.style.overflow = "auto"; // ADD THIS LINE
        document.body.style.height = "auto"; // ADD THIS LINE
      });
    });
    let modals = document.querySelectorAll(".bg-modal");
    modals.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("active")) {
          getModal.classList.remove("active");
          document.body.style.overflow = "auto"; // ADD THIS LINE
          document.body.style.height = "auto"; // ADD THIS LINE
        }
      });
    });
    //     if (currentlyModal) {
    //       currentlyModal.classList.toggle("active");
    //     }
    //     console.log(currentlyModal);
    //     const modalId = e.target.getAttribute("href").slice(1);
    //     console.log(modalId);
    //     let getModal = document.getElementById(modalId);
    //     getModal.classList.toggle("active");
    //     document.body.style.overflow = "hidden"; // ADD THIS LINE
    //     document.body.style.height = "100%"; // ADD THIS LINE
    //     console.log(getModal);
    //     getModal.addEventListener("click", (e) => {
    //       getModal.classList.remove("active");
    //       document.body.style.overflow = "auto"; // ADD THIS LINE
    //       document.body.style.height = "100%"; // ADD THIS LINE
    //     });
    //     closeModal = document.querySelectorAll(".modal-btn");
    //     closeModal.forEach((link) => {
    //       link.addEventListener("click", () => {
    //         getModal.classList.remove("active");
    //         document.body.style.overflow = "auto"; // ADD THIS LINE
    //         document.body.style.height = "100%"; // ADD THIS LINE
    //       });
    //     });
  });
});
