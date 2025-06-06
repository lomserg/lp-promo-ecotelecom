var swiper2 = new Swiper(".tarifs-slider-container2", {
  loop: false,
  grabCursor: true,
  // cssMode: true,
  //allowTouchMove: true,
  //  freeMode: true,
  noSwiping: false,
  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1.15,
    },
    550: {
      slidesPerView: 1.9,
    },
    768: {
      slidesPerView: 3,
    },
    991: {
      slidesPerView: 3,
    },
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
