const burgerBtn = document.querySelector('.burgerBtn'),
      contactsLink = document.querySelector('.headerNavLink__contacts'),
      burgerMenu = document.querySelector('.burgerMenu');
      const body = document.querySelector('.body')
burgerBtn.addEventListener('click', () => {
burgerMenu.classList.toggle('burgerMenu__active');
burgerBtn.classList.toggle('burgerBtn__active');
if(burgerMenu.classList.contains('burgerMenu__active')) {
    body.style.overflow = 'hidden'
} else {
    body.style.overflow = 'visible'

}
})
contactsLink.addEventListener('click', () => {
    burgerMenu.classList.toggle('burgerMenu__active');
    burgerBtn.classList.toggle('burgerBtn__active');

})
