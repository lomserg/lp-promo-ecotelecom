document.addEventListener("DOMContentLoaded", function () {
  function initSwiperWhenReady() {
    if (typeof Swiper !== "undefined") {
      new Swiper(".tarifs-slider-container2", {
        loop: false,
        grabCursor: true,
        spaceBetween: 20,
        breakpoints: {
          0: { slidesPerView: 1.15 },
          550: { slidesPerView: 1.9 },
          768: { slidesPerView: 3 },
          991: { slidesPerView: 3 },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    } else {
      // Если Swiper ещё не загрузился — ждём
      setTimeout(initSwiperWhenReady, 50);
    }
  }
  initSwiperWhenReady();
});
