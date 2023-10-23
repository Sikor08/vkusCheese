const burgerBtn = document.querySelector('.burgerBtn'),
      contactsLink = document.querySelector('.headerNavLink__contacts'),
      burgerMenu = document.querySelector('.burgerMenu');
burgerBtn.addEventListener('click', () => {
burgerMenu.classList.toggle('burgerMenu__active');
burgerBtn.classList.toggle('burgerBtn__active');
})
contactsLink.addEventListener('click', () => {
    burgerMenu.classList.toggle('burgerMenu__active');
    burgerBtn.classList.toggle('burgerBtn__active');
})
