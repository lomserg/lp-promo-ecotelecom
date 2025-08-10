const swiper = new Swiper('.swiper1', {
    // Optional parameters
    loop: false,
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
        0: {
            slidesPerView: 1.15
        },
        550: {
            slidesPerView: 1.9,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 3,
        }
    }, 
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next1",
        prevEl: ".swiper-button-prev1",
      },
  
  });


  const swiper2 = new Swiper('.swiper2', {
    // Optional parameters
    loop: false,
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
        0: {
            slidesPerView: 1.15
        },
        550: {
            slidesPerView: 1.9,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 3,
        }
    }, 
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next2",
        prevEl: ".swiper-button-prev2",
      },
  
  });