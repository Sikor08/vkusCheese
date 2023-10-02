// burgerMenu
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

const latestList = document.querySelector('.latestList')
const latestGood = document.querySelector('.latestGood');
const modal = document.querySelector('.modal');
let modalArr = [];
let localArr = JSON.parse(localStorage.getItem('cartGoods'));

const cartQuantity = document.querySelector('.cartQuantity');
const cartQuantityWrap = document.querySelector('.cartQuantityWrap');

const isEmpty = (arr) => {
    if (arr.length> 0) {
        return false
    } else {
        return true
    }
}
if (isEmpty(localArr)) {
    cartQuantityWrap.style.display = 'none'
} else {
    cartQuantity.textContent = localArr.length
    cartQuantityWrap.style.display = 'flex';
}
localArr.forEach(item => {
    const goods = document.querySelectorAll('.latestGood')
    goods.forEach(good => {
        if (item.id == good.getAttribute('data-id')) {
            const buyIconIn = good.querySelector('.buyIconIn');
            buyIconIn.classList.remove('invisible');
            buyIconIn.addEventListener('click', () => {once: true})
        }
    })

})

const createGoodModal = (id, img, description, title, price) => {
    return {
        id,
        img,
        description,
        title,
        price,
    }
}
const createCartGood = (id, img, title, price, quantity) => {
    return {
        id,
        img,
        title,
        price,
        quantity
    }
}
latestList.addEventListener('click', (event) => {
    const closest = event.target.closest('.latestGood');
    const id = closest.getAttribute('data-id');
    const title = closest.querySelector('.latestGood__title').textContent;
    const price = closest.querySelector('.latestGood__priceValue').textContent;
    const img = closest.querySelector('.latestGood__img').getAttribute('src');
    const description = closest.querySelector('.latestGood__description').textContent;
    if (event.target.classList.contains('latestGood__img') || event.target.classList.contains('latestGood__title')) {
        modalArr.push(createGoodModal(id, img, description, title, price));
        renderGoodModal(modalArr);
                modal.classList.add('modal__active');
    }
    localArr.forEach(item => {
        if (item.id == id) {
            const stepper = document.querySelector('.modalBuyWrap');
            const buyBtns = document.querySelectorAll('.buyBtn');
            buyBtns.forEach(btn => {
                stepper.style.visibility = 'hidden'
                btn.textContent = 'Товар добавлен';
                btn.setAttribute('disabled', true);

            })
        } 
    })
    if (event.target.classList.contains('buyIcon')) {
        localArr.push(createCartGood(id, img, title, price, quantity = 1));
        localStorage.setItem('cartGoods', JSON.stringify(localArr));
        console.log(cartQuantity)
        cartQuantity.textContent = localArr.length;
        cartQuantityWrap.style.display = 'flex';
        const buyIconIn = catalogData.querySelector('.buyIconIn');
        console.log(buyIconIn)
        buyIconIn.classList.remove('invisible');
        // classList.add('active')

        console.log(localArr.length)

    }
});


const renderGoodModal = (arr) => {

    modal.innerHTML = ''
    arr.forEach(good => {
        const modalGood = document.createElement('div');
        modalGood.classList.add('modalGood');
        modalGood.setAttribute('data-id', good.id)

        const modalImg = document.createElement('img');
        modalImg.classList.add('modalGood__img');
        modalImg.setAttribute('src', good.img);
        modalGood.append(modalImg);

        const modalInfo = document.createElement('div');
        modalInfo.classList.add('modalGood__info');
        modalGood.append(modalInfo);

        const modalTitle = document.createElement('p');
        modalTitle.textContent = good.title;
        modalTitle.classList.add('modalGood__title')
        modalInfo.append(modalTitle);

        const description = document.createElement('p');
        description.textContent = good.description;
        description.classList.add('modalGood__description')
        modalInfo.append(description);
        
        const modalPrice = document.createElement('p');
        modalPrice.textContent = good.price;
        modalPrice.classList.add('modalGood__price')
        modalInfo.append(modalPrice);
        modal.append(modalGood);

        const minusBtn = document.createElement('button');
        minusBtn.classList.add('modalBtn');
        minusBtn.classList.add('minusBtn')
        minusBtn.textContent = '-';
        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(counter.textContent.match(/\d+/));
            quantity--;
            quantity <= 1 ? quantity = 1 : quantity;
            counter.textContent = `${quantity} шт`;
        })

        let counter = document.createElement('span');
        counter.classList.add('modalCounter')
        counter.textContent = '1 шт';

        const plusBtn = document.createElement('button');
        plusBtn.classList.add('modalBtn');
        plusBtn.classList.add('plusBtn');
        plusBtn.textContent = '+';
        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(counter.textContent.match(/\d+/));
            quantity++;
            quantity >= 3 ? quantity = 3 : quantity;
            counter.textContent = `${quantity} шт`;
        })

        const buyBlock = document.createElement('div');
        buyBlock.classList.add('modalBuyWrap');
        buyBlock.append(minusBtn);
        buyBlock.append(counter);
        buyBlock.append(plusBtn);
        modalInfo.append(buyBlock)

        const byuBtn = document.createElement('button');
        byuBtn.classList.add('buyBtn')
        modalInfo.append(byuBtn);
        byuBtn.textContent = 'В корзину'


        const closeBtn = document.createElement('img');
        closeBtn.setAttribute('src', 'img/icons/closeIcon.svg');
        closeBtn.classList.add('modalGood__close');
        modalGood.append(closeBtn);
        closeBtn.textContent = 'закрыть';
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('modal__active')
            modalArr.splice(0, modalArr.length);

        })
    })
}
modal.addEventListener('click', (element) => {
    if(element.target.classList.contains('buyBtn')) {
        const closest = element.target.closest('.modalGood');
        const id = closest.getAttribute('data-id');
        const img = closest.querySelector('.modalGood__img').getAttribute('src');
        const title = closest.querySelector('.modalGood__title').textContent;
        let price = closest.querySelector('.modalGood__price');
        price = parseInt(price.textContent.match(/\d+/));
        let quantity = closest.querySelector('.modalCounter');
        quantity = parseInt(quantity.textContent.match(/\d+/));

        localArr.push(createCartGood(id, img, title, price, quantity));
        localStorage.setItem('cartGoods', JSON.stringify(localArr));

        element.target.textContent = 'Товар добавлен';
        cartQuantityWrap.style.display = 'flex';
        cartQuantity.textContent = localArr.length;
        element.target.setAttribute('disabled', true);
        const stepper = document.querySelector('.modalBuyWrap');
        stepper.style.visibility = 'hidden';
        localArr.forEach(item => {
            const goods = document.querySelectorAll('.catalogGood')
            goods.forEach(good => {
                if (item.id == good.getAttribute('data-id')) {
                    console.log(good.querySelector('.buyIconIn'))
                    const buyIconIn = good.querySelector('.buyIconIn');
                    buyIconIn.classList.remove('invisible');
                    buyIconIn.addEventListener('click', () => {once: true})
                }
            })
        })
    }
})





