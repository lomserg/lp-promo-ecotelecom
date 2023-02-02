
const chanelBtns = document.querySelectorAll('.channels_link')
const ultaKino = []
// console.log(ultaKino.push("5e7b7e70acb10bd8ce882ef1"))
// const modalTairif = document.getElementById('pack-630f5b1c944a765510046e89')
// console.log(modalTairif)

// const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");


// accordionItemHeaders.forEach(accordionItemHeader => {
//     accordionItemHeader.addEventListener("click", event => {

//         // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

//         const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
//         if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
//           currentlyActiveAccordionItemHeader.classList.toggle("active");
//           currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
//         }

//         accordionItemHeader.classList.toggle("active");
//         const accordionItemBody = accordionItemHeader.nextElementSibling;
//         if (accordionItemHeader.classList.contains("active")) {
//             accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
//         }
//         else {
//             accordionItemBody.style.maxHeight = 0;
//         }

//     });
// });

chanelBtns.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        // let modals = document.querySelectorAll('.bg-modal')
        const currentlyModal = document.querySelector(".bg-modal.active");
        
        if(currentlyModal) {
            currentlyModal.classList.toggle("active");
        }
        console.log(currentlyModal)
        const modalId = e.target.getAttribute('href').slice(1)
        console.log(modalId)
        let getModal = document.getElementById(modalId)
        getModal.classList.toggle("active");
        document.body.style.overflow = "hidden"; // ADD THIS LINE
        document.body.style.height = "100%"; // ADD THIS LINE
        console.log(getModal)
        getModal.addEventListener('click', (e) => {
            getModal.classList.remove("active")
            document.body.style.overflow = "auto"; // ADD THIS LINE
    document.body.style.height = "100%"; // ADD THIS LINE
        })
        closeModal = document.querySelectorAll('.modal-btn')
                closeModal.forEach(link => {
            link.addEventListener('click', () => {
                getModal.classList.remove("active")
                document.body.style.overflow = "auto"; // ADD THIS LINE
    document.body.style.height = "100%"; // ADD THIS LINE
             })
        })
        
})
})