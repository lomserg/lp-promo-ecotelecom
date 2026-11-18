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
document.addEventListener("DOMContentLoaded", () => {
  // ============ ACCORDION ============
  const headers = document.querySelectorAll(".accordion-header");
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const isActive = header.classList.contains("active");
      if (!isActive) {
        header.classList.add("active");
        const body = header.nextElementSibling;
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        header.classList.remove("active");
        header.nextElementSibling.style.maxHeight = null;
      }
    });
  });

  // ============ SWIPER & FILTER ============
  let swiper;
  const wrapper = document.querySelector(".tarifs-swiper .swiper-wrapper");
  let allSlides = Array.from(wrapper.querySelectorAll(".tarif-item"));
  let currentCategory = "internet";

  function initSwiper() {
    // Уничтожаем старый swiper если существует
    if (swiper) {
      swiper.destroy(true, true);
    }

    swiper = new Swiper(".tarifs-swiper", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      observer: true,
      observeParents: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }

  function filter(category) {
    currentCategory = category;

    // Показываем/скрываем слайды с помощью CSS
    allSlides.forEach((slide) => {
      if (slide.dataset.category === category) {
        slide.style.display = ""; // Показываем
      } else {
        slide.style.display = "none"; // Скрываем
      }
    });

    // Пересчитываем слайды в Swiper
    if (swiper) {
      swiper.update();
    }
  }

  // ============ ОБРАБОТЧИКИ ТАБОВ ============
  const tabs = document.querySelectorAll(".tab_btn");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Удаляем активный класс со всех табов
      tabs.forEach((t) => t.classList.remove("active"));

      // Добавляем активный класс на текущий таб
      tab.classList.add("active");

      // Получаем категорию и фильтруем
      const category = tab.dataset.category;
      filter(category);
    });
  });

  // Инициализация при загрузке
  initSwiper();

  // Показываем первую категорию
  const defaultCategory = tabs[0]?.dataset.category || "internet";
  filter(defaultCategory);

  // Пересчитываем при изменении размера окна
  window.addEventListener("resize", () => {
    if (swiper) {
      swiper.update();
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("utm_source").value = params.get("utm_source") || "";
  document.getElementById("utm_medium").value = params.get("utm_medium") || "";
  document.getElementById("utm_campaign").value =
    params.get("utm_campaign") || "";
  document.getElementById("utm_term").value = params.get("utm_term") || "";
});
document.getElementById("form1").addEventListener("submit", function () {
  const btn = this.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.innerText = "Отправка...";

  ym(49966909, "reachGoal", "form-submit");
});
// Initialize tooltips with Tippy.js
// tippy("#video0", {
//   content:
//     "Онлайн-кинотеатр AMEDIATEKA, START или PREMIER на выбор: эксклюзивные премьеры, кино и сериалы",
//   theme: "light",
//   placement: "bottom",
// });

// tippy("#video1", {
//   content: "Онлайн-кинотеатр PREMIER",
//   theme: "light",
//   placement: "bottom",
// });

// tippy("#video2", {
//   content:
//     "Онлайн-кинотеатр PREMIER включен в тариф. Видеосервис Amediateka или START — на выбор.",
//   theme: "light",
//   placement: "bottom",
// });

// tippy("#video3", {
//   content:
//     "Amediateka, START и PREMIER: видео на любой вкус. Все популярные онлайн-кинотеатры в высоком качестве, без рекламы",
//   theme: "light",
//   placement: "bottom",
// });

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
// tippy("#tooltip1", {
//   content:
//     "Видеосервис AMEDIATEKA, START, IVI, PREMIER или «Лучшее от more.tv» на выбор: горячие новинки и классика",
//   arrow: true,
// });

// tippy("#tooltip2", {
//   content:
//     "Онлайн-кинотеатр START, IVI или PREMIER на выбор: эксклюзивные премьеры, кино и сериалы",
// });
