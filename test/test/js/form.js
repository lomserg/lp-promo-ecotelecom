const formBtn = document.querySelectorAll(".btn-tarif");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".modal__overlay");
const coseBtn = document.querySelector(".modal-close");

formBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    modal.style.display = "block";
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
  });
});

coseBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  modal.style.display = "none";
  overlay.classList.remove("open");
  document.body.style.overflow = "auto"; // ADD THIS LINE
  document.body.style.height = "auto"; // ADD THIS LINE
});

overlay.addEventListener("click", (event) => {
  if (event.target == overlay) {
    modal.style.display = "none";
    overlay.classList.remove("open");
    document.body.style.overflow = "auto"; // ADD THIS LINE
    document.body.style.height = "auto"; // ADD THIS LINE
  }
});
const ERROR_MSG = "Ошибка";
const SUCCESS_MSG = "Заявка отправленна"; // Fixed a typo in the variable name
const form1 = document.querySelector("#form1");
console.log(form1);
form1.addEventListener("submit", formSend1);

async function formSend1(e) {
  e.preventDefault();
  const formData = new FormData(form1);
  console.log(formData);
  try {
    let response = await fetch("php/index.php", {
      method: "POST", // Fixed the method name
      body: formData,
    });
    if (response.ok) {
      form1.reset();
      modal.style.display = "none";
      overlay.classList.remove("open");
      document.body.style.overflow = "auto"; // ADD THIS LINE
      document.body.style.height = "auto"; // ADD THIS LINE
      showToast(SUCCESS_MSG, "linear-gradient(to right, #00b09b, #96c93d)");
      redirect();
    } else {
      showToast(ERROR_MSG, "linear-gradient(to right, red, red)");
    }
  } catch (error) {
    console.error(error);
    showToast(ERROR_MSG, "linear-gradient(to right, red, red)");
  }
}

const form2 = document.querySelector("#form2");

form2.addEventListener("submit", formSend2);

async function formSend2(e) {
  e.preventDefault();
  const formData = new FormData(form2);
  console.log(formData);
  try {
    let response = await fetch("php/index2.php", {
      method: "POST", // Fixed the method name
      body: formData,
    });
    if (response.ok) {
      form2.reset();
      modal.style.display = "none";
      overlay.classList.remove("open");
      document.body.style.overflow = "auto"; // ADD THIS LINE
      document.body.style.height = "auto"; // ADD THIS LINE
      showToast(SUCCESS_MSG, "linear-gradient(to right, #00b09b, #96c93d)");
      redirect();
    } else {
      showToast(ERROR_MSG, "linear-gradient(to right, red, red)");
    }
  } catch (error) {
    console.error(error);
    showToast(ERROR_MSG, "linear-gradient(to right, red, red)");
  }
}

function showToast(message, colorMsg) {
  Toastify({
    text: message,
    duration: 5000,
    destination: "https://teleru.net/",
    newWindow: true,
    close: false,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    className: "info__toast",
    style: {
      background: colorMsg,
    },
  }).showToast();
}

const redirect = () => {
  let currentLocation = "https://promo.teleru.net/";

  location.replace(currentLocation + "php/thank_you.html");
};
