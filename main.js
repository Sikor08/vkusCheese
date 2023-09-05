// burgerMenu
const burgerBtn = document.querySelector('.burgerBtn'),
      burgerMenu = document.querySelector('.burgerMenu');
burgerBtn.addEventListener('click', () => {
    console.log('ok')
    burgerMenu.classList.toggle('burgerMenu__active');
    burgerBtn.classList.toggle('burgerBtn__active');
})



