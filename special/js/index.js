// const modal_container = document.getElementById('modal-container');
// const modal = document.querySelector('#modal')
// const overlay = document.querySelector('#overlay')

// TODO: 3. Create a click event listener for the open-modal-btn that adds the class "open" to the modal

//buttons.forEach(e => e.addEventListener("click", activeBg, false));

// closeX.addEventListener('click', e => {
//     modalBg.classList.remove('bg-active')

// })

// document.addEventListener('click', e => {
//     console.log(e)
// })

const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

    // const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    // if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
    //   currentlyActiveAccordionItemHeader.classList.toggle("active");
    //   currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    // }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

tippy("#video0", {
  content:
    "Онлайн-кинотеатр START, PREMIER или more.tv на выбор: эксклюзивные премьеры, кино и сериалы",
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
    "Видеосервис Amediateka, START или more.tv на выбор. Онлайн-кинотеатр PREMIER до 31 декабря 2022 года бесплатно!",
  theme: "light",
  placement: "bottom",
});

tippy("#video3", {
  content:
    "Amediateka, START, more.tv и PREMIER: видео на любой вкус. Все популярные онлайн-кинотеатры в высоком качестве, без рекламы",
  theme: "light",
  placement: "bottom",
});

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

// BONUS: Also add the class "open" to the overlay - ok

// TODO: 4. Create a click event listener for the close-modal-btn that removes the class "open" from the modal

// BONUS: Also remove the class "open" from the overlay - ok

// BONUS: Add a click event listener to the overlay that removes the class "open" from the modal and the overlay

// BONUS: Add a click event listener to the overlay that removes the class "open" from the modal and the overlay
let phone = document.querySelector(".phone");
let content7850 =
  '<a class="phoneid" href="tel: +74998017850">+7 499 801-78-50</a>';
let content7851 =
  '<a class="phoneid" href="tel: +74998017851">+7 499 801-78-51</a>';
let content7852 =
  '<a class="phoneid" href="tel: +74998017852">+7 499 801-78-52</a>';
let content7853 =
  '<a class="phoneid" href="tel: +74998017853">+7 499 801-78-53</a>';
let content7854 =
  '<a class="phoneid" href="tel: +74998017854">+7 499 801-78-54</a>';
let content7855 =
  '<a class="phoneid" href="tel: +74998017855">+7 499 801-78-55</a>';
let content7856 =
  '<a class="phoneid" href="tel: +74998017856">+7 499 801-78-56</a>';
let content7857 =
  '<a class="phoneid" href="tel: +74998017857">+7 499 801-78-57</a>';
let content7858 =
  '<a class="phoneid" href="tel: +74998017858">+7 499 801-78-58</a>';
let content7859 =
  '<a class="phoneid" href="tel: +74998017859">+7 499 801-78-59</a>';
let content7860 =
  '<a class="phoneid" href="tel: +74998017860">+7 499 801-78-60</a>';

console.log(phone);

let whatsapp = document.getElementById("whatsapp-link");
//.getAttribute("href").split("=")
// let whatsappNumber = parseInt(whatsapp[1])

//console.log(whatsapp.href)

// closeX.addEventListener('click', () => {
//     modal_container.classList.remove('show');
// })

const queryString = window.location.search;

//console.log(queryString);

let paramString = queryString.split("=")[3];
// let paramSource = paramString.split('=')[1];

console.log(typeof paramString);
console.log(typeof queryString);

let utmOpm = paramString.split("&");
console.log(utmOpm[0]);

let watsapp_7850 = "https://api.whatsapp.com/send/?phone=79166063084";
let watsapp_7851 = "https://api.whatsapp.com/send/?phone=79778373538";

let opm_7850 = "opm_7850";
let opm_7851 = "opm_7851";

let opm_7852 = "opm_7852";
let opm_7853 = "opm_7853";

let opm_7854 = "opm_7854";
let opm_7855 = "opm_7855";

let opm_7856 = "opm_7856";
let opm_7857 = "opm_7857";

let opm_7859 = "opm_7859";
let opm_7860 = "opm_7860";

if (utmOpm[0].includes(opm_7850)) {
  phone.innerHTML = content7850;
  whatsapp.href = watsapp_7850;
} else if (utmOpm[0].includes(opm_7851)) {
  phone.innerHTML = content7851;
} else if (utmOpm[0].includes(opm_7852)) {
  phone.innerHTML = content7852;
} else if (utmOpm[0].includes(opm_7853)) {
  phone.innerHTML = content7853;
} else if (utmOpm[0].includes(opm_7854)) {
  phone.innerHTML = content7854;
} else if (utmOpm[0].includes(opm_7855)) {
  phone.innerHTML = content7855;
} else if (utmOpm[0].includes(opm_7856)) {
  phone.innerHTML = content7856;
} else if (utmOpm[0].includes(opm_7857)) {
  phone.innerHTML = content7857;
} else if (utmOpm[0].includes(opm_7859)) {
  phone.innerHTML = content7859;
} else if (utmOpm[0].includes(opm_7860)) {
  phone.innerHTML = content7860;
}

tippy("#tooltip1", {
  content:
    "Видеосервис AMEDIATEKA, START, PREMIER или «Лучшее от more.tv» на выбор: горячие новинки и классика",
  arrow: true,
});

tippy("#tooltip2", {
  content:
    "Онлайн-кинотеатр START, IVI или PREMIER на выбор: эксклюзивные премьеры, кино и сериалы",
});
