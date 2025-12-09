document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".tarifs-slider-container", {
    loop: false, // ВАЖНО! При фильтрации loop ломается
    grabCursor: true,
    spaceBetween: 10,
    noSwiping: false,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      991: { slidesPerView: 3 },
    },
  });

  const tabs = document.querySelectorAll(".tab_btn");
  const slides = document.querySelectorAll(".tarif-item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.category;

      // переключение активной кнопки
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // фильтрация слайдов
      slides.forEach((slide) => {
        if (slide.dataset.category === category) {
          slide.style.display = "block";
        } else {
          slide.style.display = "none";
        }
      });

      // ОБНОВЛЕНИЕ swiper
      setTimeout(() => {
        swiper.update();
        swiper.slideTo(0);
      }, 50);
    });
  });
});
