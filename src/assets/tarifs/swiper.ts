import Swiper from "swiper";
import "swiper/swiper-bundle.css"; // Import Swiper styles

// Assuming you have a div with class "swiper-container" in your HTML
const swiperContainer = document.querySelector(".swiper") as HTMLElement;

// Initialize Swiper
const swiper = new Swiper(swiperContainer, {
  // Swiper configuration options
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  // Add other options as needed
});
