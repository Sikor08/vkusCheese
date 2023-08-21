// burgerMenu
const burgerBtn = document.querySelector('.burgerBtn'),
      burgerMenu = document.querySelector('.burgerMenu');
burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('burgerMenu__active');
    burgerBtn.classList.toggle('burgerBtn__active');
})

// swiper
const sliderImgs = document.querySelectorAll('.sliderLine__img'),
      sliderLine = document.querySelector('.sliderLine'),
      sliderDots = document.querySelectorAll('.sliderDot'),
      prevBtn = document.querySelector('.sliderBtn__prev'),
      nextBtn = document.querySelector('.sliderBtn__next');

    let sliderCount = 0;
    let sliderWidth;
//response
    const showSlide = () => {
        sliderWidth = document.querySelector('.slider').offsetWidth;
        sliderLine.style.width = sliderWidth * sliderImgs.length + 'px';
        sliderImgs.forEach(item => item.style.width = sliderWidth + 'px');
    }

    window.addEventListener('resize', showSlide());
    const rollSlide = () => {
        sliderLine.style.transform = `translateX(${- sliderCount * sliderWidth}px)`
    }
    const nextSlide = () => {
        sliderCount++;
        sliderCount >= sliderImgs.length ? sliderCount = 0 : sliderCount;
        rollSlide()
    }
    const prevSlide = () => {
        sliderCount--;
        sliderCount < 0 ? sliderCount = sliderImgs.length - 1 : sliderCount;
        rollSlide()
    }
    nextBtn.addEventListener('click', () => {
        nextSlide();
    })
    prevBtn.addEventListener('click', () => {
        prevSlide()
    })
    setInterval(() => {
        nextSlide()
    }, 2000);
    

