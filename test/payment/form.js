const buttonDropdown = document.querySelector('#button-dropdown');
const select = document.querySelector('#dropdown');
const options = document.querySelectorAll('.option');
const selectLabel = document.querySelector('#select-label');
// const vac = document.querySelector('#vac2')

// // console.log(options)

buttonDropdown.addEventListener('click', (e)=> {
    e.preventDefault();
    toggleHidden()
})

const toggleHidden = () => {
    select.classList.toggle('hidden')
}

options.forEach(option => {
    option.addEventListener('click', (e) => {
        setSelectTitle(e)
    })
} )

const setSelectTitle = (e) => {
    const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText
    console.log(labelElement)
    selectLabel.innerText = labelElement
    toggleHidden()
    // vac.value = selectLabel.innerText
}