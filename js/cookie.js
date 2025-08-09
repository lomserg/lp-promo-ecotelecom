document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookieBanner");
  const acceptBtn = document.querySelector(".acceptCookies");

  if (!acceptBtn) {
    console.warn("Кнопка согласия не найдена.");
    return;
  }

  if (localStorage.getItem("cookiesAccepted") !== "true") {
    banner.style.display = "block";
  }

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    banner.style.display = "none";
  });
});
