// const buttonForm = document.querySelector('#button-dropdown');
// const select = document.querySelector('#dropdown');
// const options = document.querySelectorAll('.option');
// const selectLabel = document.querySelector('#select-label');
// const vac = document.querySelector('#vac2')

// // console.log(options)

// buttonForm.addEventListener('click', (e)=> {
//     e.preventDefault();
//     toggleHidden()
// })

// const toggleHidden = () => {
//     select.classList.toggle('hidden')
// }

// options.forEach(option => {
//     option.addEventListener('click', (e) => {
//         setSelectTitle(e)
//     })
// } )

// const setSelectTitle = (e) => {
//     const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText
//     console.log(labelElement)
//     selectLabel.innerText = labelElement
//     toggleHidden()
//     vac.value = selectLabel.innerText
// }
function check(box) {
    // var el = box.querySelectorAll('input[type="radio"]');
    // var radioId = "";
    // el.forEach(element => {
    //   radioId = element.id
    // });
    let el = box
    let elChild = el.querySelector('.dropdown-item-info')
    console.log(el);
    console.log(elChild);
    var radio = elChild.querySelector('input[type="radio"]')
    console.log(radio.id)

    let radioId = radio.id
    document.getElementById(radioId).click();
}