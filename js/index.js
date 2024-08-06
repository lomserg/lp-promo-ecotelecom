// Query the accordion item headers
const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

// Add click event listeners to each accordion item header
accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    // Uncomment if you want only one item open at a time
    // const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    // if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
    //   currentlyActiveAccordionItemHeader.classList.toggle("active");
    //   currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    // }

    // Toggle active class and adjust max-height
    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

// Initialize tooltips with Tippy.js
tippy("#video0", {
  content:
    "Онлайн-кинотеатр AMEDIATEKA, START или PREMIER на выбор: эксклюзивные премьеры, кино и сериалы",
  theme: "light",
  placement: "bottom",
});

tippy("#video1", {
  content: "Онлайн-кинотеатр PREMIER",
  theme: "light",
  placement: "bottom",
});

tippy("#video2", {
  content:
    "Онлайн-кинотеатр PREMIER включен в тариф. Видеосервис Amediateka или START — на выбор.",
  theme: "light",
  placement: "bottom",
});

tippy("#video3", {
  content:
    "Amediateka, START и PREMIER: видео на любой вкус. Все популярные онлайн-кинотеатры в высоком качестве, без рекламы",
  theme: "light",
  placement: "bottom",
});

// Example functions for modal handling (commented out as they may not be relevant to the error)
// function noScroll() {
//     window.scrollTo(0, 0)
// }

// function openForm() {
//     window.scrollTo(0, 0)
//     modal_container.classList.add('show');
//     modal.classList.add('open')
//     overlay.classList.add('open')
// }

// closeX.addEventListener('click', e => {
//     modal.classList.remove('open')
//     overlay.classList.remove('open')
// })

// overlay.addEventListener('click', e => {
//     modal.classList.remove('open')
//     overlay.classList.remove('open')
//     modal_container.classList.remove('show');
// });

// function sayHello() {
//     console.log("Darth Vader");
// }

// buttons.forEach(e => e.addEventListener("click", openForm, false));

// Bonus features for modal handling
// TODO: 4. Create a click event listener for the close-modal-btn that removes the class "open" from the modal
// BONUS: Also remove the class "open" from the overlay

// Phone number setup based on URL query string
let phone = document.querySelector(".phone");
let contentY =
  '<a class="phoneid" href="tel: +74995055627">+7 499 505-56-27</a>';
let contentG =
  '<a class="phoneid" href="tel: +74995055612">+7 499 505-56-12</a>';

let queryStringUrl = window.location.search;

let paramString = queryStringUrl.split("&")[1];
// let paramSource = paramString.split('=')[1];

let ourSubstring = "yandex";
let ourSubstring2 = "google";

if (queryStringUrl.includes(ourSubstring)) {
  phone.innerHTML = contentY;
} else if (queryStringUrl.includes(ourSubstring2)) {
  phone.innerHTML = contentG;
} else {
  console.log("asdasd.");
}

// Additional tooltips
tippy("#tooltip1", {
  content:
    "Видеосервис AMEDIATEKA, START, IVI, PREMIER или «Лучшее от more.tv» на выбор: горячие новинки и классика",
  arrow: true,
});

tippy("#tooltip2", {
  content:
    "Онлайн-кинотеатр START, IVI или PREMIER на выбор: эксклюзивные премьеры, кино и сериалы",
});
