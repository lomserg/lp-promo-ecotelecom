document.addEventListener('click', e => {
    console.log(e)
})
// форма
const closeFormModal = document.getElementById('closeForm');
const modalBg = document.querySelector(".modal-bg");
let modal = document.querySelector(".modal");
console.log(closeFormModal)


function activeBgSecond() {
    modalBg.classList.add('bg-active')
}


// корзина
const checkout = document.querySelector('.checkout')
const chooseBtn = document.querySelectorAll('.choose-btn')

function showCheckout(e) {
    removeSelected()

    checkout.style.transform = 'translateY(0)'
    e.target.parentElement.classList.add('selected')
    e.target.parentElement.childNodes[9].classList.add('selected')
    
    checkout.classList.add('checkout-active')
    //console.log(e.target.parentElement.childNodes)

    const product = e.target.parentElement.childNodes[5].innerHTML
    let price = parseInt(e.target.parentElement.childNodes[7].innerHTML)

    checkout.innerHTML = `
   
    <div class="total-price">
    <h3>Вы выбрали</h3>
    <div class="selection"><span>${product}</span><span>${price} руб/мес</span><button class="checkout-btn">Подключить</button></div>
 
   

</div>
<a href="javascript:void(0);" class="close-btn">
    <i class="fas fa-times"></i>
</a>`;


let checkoutBtn = document.querySelector('.checkout-btn');

checkoutBtn.addEventListener('click', () => {
    modalBg.classList.add('bg-active')
})

const closeBtn = document.querySelector('.close-btn')

closeBtn.addEventListener('click', hideCheckout)

function hideCheckout() {
    e.preventDefault()
  
    const selectedElements = document.querySelectorAll('.selected')
    selectedElements.forEach(item => {
        item.classList.remove('selected')
    })

    checkout.style.transform = 'translateY(100%)'
    checkout.classList.remove('checkout-active')

}
closeFormModal.addEventListener('click', e => {
    modalBg.classList.remove('bg-active')

 })
} // end showCheckout

const closeBtn = document.querySelector('.close-btn')


function hideCheckout(e) {
    
    checkout.classList.remove('checkout-active')
    checkout.style.transform = 'translateY(100%)'
}

closeBtn.addEventListener('click', hideCheckout)



chooseBtn.forEach(item => {

    item.addEventListener('click', showCheckout)
  
})





function removeSelected() {
    const selectedElements = document.querySelectorAll('.selected')
    selectedElements.forEach(item => {
        item.classList.remove('selected')
    })
}


const output = document.querySelector('.output')
const url = `https://docs.google.com/spreadsheets/d/`
const ssid = `1ZYLHnnLVPCmr8vp_J7RXCy_7Cjm7Bh8FyO6_6ufNupo`
const query = `/gviz/tq?`
const formatUrl = `tqx=out:json`
const startKino = 'sheet=startKino'
const startTv = 'sheet=startTv'
const hitTv = 'sheet=hitTv'
const ultraKino = 'sheet=ultraKino'
const megaKino = 'sheet=megaKino'
const endpoint = `${url}${ssid}${query}`
const lastUrl = `${url}${ssid}${query}&${formatUrl}&${hitTv}`
// кнопки
const btns = document.querySelectorAll('[data-target]')
console.log(btns)
const btn = document.getElementById('getTv')

// функция для кнопок

//let buttons = document.querySelectorAll('.btn-tarif');
let modalBgTv = document.querySelector(".modal-bg-tv")
let modalTv = document.querySelector(".modal-tv")
const closeTv = document.getElementById('close-tv');

// const modal_container = document.getElementById('modal-container');
// const modal = document.querySelector('#modal')
const overlayTv = document.querySelector('#overlay')

// TODO: 3. Create a click event listener for the open-modal-btn that adds the class "open" to the modal

btns.forEach(e => e.addEventListener("click", activeBgTv, false));

function activeBgTv(event) {
    modalBgTv.classList.add('bg-active')


    function checkEventTarget (event) {
        if(event.target.id == 'startTv') {
            console.log(event.target.id)
            return `${url}${ssid}${query}&${formatUrl}&${startTv}`
       } else if(event.target.id === 'hitTv') {
        return `${url}${ssid}${query}&${formatUrl}&${hitTv}`
       }  else if(event.target.id === 'startKino') {
        return `${url}${ssid}${query}&${formatUrl}&${startKino}`
        }   else if(event.target.id === 'ultraKino') {
        return `${url}${ssid}${query}&${formatUrl}&${ultraKino}`
       } else if(event.target.id === 'megaKino') {
        return `${url}${ssid}${query}&${formatUrl}&${megaKino}`
       }
    }

    fetch(checkEventTarget(event))
    .then(res => res.text())
    .then(data => {
       const temp = data.substring(47).slice(0,-2)
        const json = JSON.parse(temp)
        const rows = json.table.rows
        rows.forEach((row) => {
            const div = document.createElement('div')
            div.classList.add('tv')
           const temp1 = row.c
           temp1.forEach((cell) => {
            const box = document.createElement('div')
         box.textContent = cell.v
          
            
            
            box.classList.add('box')
            div.appendChild(box)
           
           } )
           output.appendChild(div)
        })
        
    })
}



closeTv.addEventListener('click', e => {
    modalBgTv.classList.remove('bg-active')
    output.innerHTML = '';
})



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
    pagination: {
        el: ".swiper-pagination",
        clickable: false,
    },
   
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
})
