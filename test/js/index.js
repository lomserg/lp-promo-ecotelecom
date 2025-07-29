import { fetchData, countGenres } from "../smotreshka/channels.js";
import { createPopup } from "../smotreshka/popup.js";

const tarifElements = document.querySelectorAll(".tarif");
console.log(createPopup);
const body = document.querySelector("body");
tarifElements.forEach((element) => {
  element.addEventListener("click", function () {
    const dataPackageValue = this.getAttribute("data-package");
    console.log("Clicked Package ID:", dataPackageValue);
    const loadingPopup = document.createElement("div");
    loadingPopup.classList.add("popup");
    loadingPopup.innerHTML = `<div class="popup-content"><p>Загрузка...</p> <div class="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div></div>
     `;
    body.appendChild(loadingPopup);
    // Call fetchData and handle the returned data
    fetchData(dataPackageValue)
      .then((data) => {
        const { intersection, genreCounts } = data;
        console.log(genreCounts);
        console.log("Intersection:", intersection);
        // for (const genre in genreCounts) {
        //   console.log(`${genre}: ${genreCounts[genre]}`);
        // }
        loadingPopup.remove();
        body.append(createPopup(genreCounts, intersection));
        // You can pass the fetched data to createPopup or do further processing
        // createPopup(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
});

function validateForm(event, form) {
  var isValid = true; // Track if the form is valid
  var name = form.querySelector("input[name='name']");
  var phone = form.querySelector("input[name='number']");
  var address = form.querySelector("input[name='address']");

  // Clear previous error styles
  name.classList.remove("error-border");
  phone.classList.remove("error-border");
  address.classList.remove("error-border");

  // Validate name
  if (name.value.trim() === "") {
    name.classList.add("error-border"); // Add red border
    isValid = false; // Mark form as invalid
  }

  // Validate phone
  if (
    phone.value.trim() === "" ||
    phone.value.length < 10 ||
    phone.value.length > 18
  ) {
    phone.classList.add("error-border"); // Add red border
    isValid = false; // Mark form as invalid
  }

  // Validate address
  if (address.value.trim() === "") {
    address.classList.add("error-border"); // Add red border
    isValid = false; // Mark form as invalid
  }

  return isValid; // Submit form only if isValid is true
}

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
