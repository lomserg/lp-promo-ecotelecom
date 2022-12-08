

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


const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");


accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", event => {

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
        }
        else {
            accordionItemBody.style.maxHeight = 0;
        }

    });
});



tippy('#video0', {
    content: 'Онлайн-кинотеатр START, PREMIER или more.tv на выбор: эксклюзивные премьеры, кино и сериалы',
    theme: 'light',
    placement: 'bottom',
  });

  tippy('#video1', {
    content: 'Онлайн-кинотеатр PREMIER',
    theme: 'light',
    placement: 'bottom',
  });

  tippy('#video2', {
    content: 'Видеосервис Amediateka, START или more.tv на выбор. Онлайн-кинотеатр PREMIER до 31 декабря 2022 года бесплатно!',
    theme: 'light',
    placement: 'bottom',
  });

  tippy('#video3', {
    content: 'Amediateka, START, more.tv и PREMIER: видео на любой вкус. Все популярные онлайн-кинотеатры в высоком качестве, без рекламы',
    theme: 'light',
    placement: 'bottom',
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
let phone = document.querySelector(".phone")
let contentY = '<a class="phoneid" href="tel: +74995055627">+7 499 505-56-27</a>';
let contentG = '<a class="phoneid" href="tel: +74995055612">+7 499 505-56-12</a>';




// closeX.addEventListener('click', () => {
//     modal_container.classList.remove('show');
// })

const queryString = window.location.search;



let paramString = queryString.split('&')[1];
// let paramSource = paramString.split('=')[1];






let ourSubstring = "yandex";
let ourSubstring2 = "google";

if (queryString.includes(ourSubstring)) {
    phone.innerHTML = contentY
} else if (queryString.includes(ourSubstring2)) {
    phone.innerHTML = contentG
} else {
    console.log("asdasd.")
}

tippy('#tooltip1', {
    content: 'Видеосервис AMEDIATEKA, START, IVI, PREMIER или «Лучшее от more.tv» на выбор: горячие новинки и классика',
    arrow: true,
});

tippy('#tooltip2', {
    content: 'Онлайн-кинотеатр START, IVI или PREMIER на выбор: эксклюзивные премьеры, кино и сериалы',

});







