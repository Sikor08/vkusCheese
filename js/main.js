const discountsList = document.querySelector('.discountsList');
const latestList = document.querySelector('.latestList');
const container = document.querySelector('.container');

const modal = document.querySelector('.modal');
const cartList = document.querySelector('.cartList');
const catalogArr = [];
let catalogFiltered = [];
let modalArr = [];

let localArr = [];

const init = (arr) => {
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
        const goods = document.querySelectorAll('.catalogGood')
        goods.forEach(good => {
            if (item.id == good.getAttribute('data-id')) {
                const buyIconIn = good.querySelector('.buyIconIn');
                buyIconIn.classList.remove('invisible');
                buyIconIn.addEventListener('click', () => {once: true})
            }
        })
    
    })
    
    const createGoodModal = (id, img, descriptionTop, descriptionConsistOf, descriptionCalories, descriptionRegion, price) => {
        return {
            id,
            img,
            descriptionTop,
            descriptionConsistOf,
            descriptionCalories,
            descriptionRegion,
            price,
        }
    }
    const createCartGood = (id, img, descriptionTop, price, quantity) => {
        return {
            id,
            img,
            descriptionTop,
            price,
            quantity
        }
    }
    discountsList.addEventListener('click', (event) => {
        const catalogData = event.target.closest('.discountsGood');
        const id = catalogData.getAttribute('data-id');
        const price = catalogData.querySelector('.discountsGood__price').textContent;
        const img = catalogData.querySelector('.discountsGood__img').getAttribute('src');
        const descriptionTop = catalogData.querySelector('.discountsGood__title').textContent;
        const descriptionConsistOf = catalogData.querySelector('.discountsGood-description__consist').textContent;
        const descriptionCalories = catalogData.querySelector('.discountsGood-description__calories').textContent;
        const descriptionRegion = catalogData.querySelector('.discountsGood-description__region').textContent;
        const container = document.querySelector('.container');

        if (event.target.classList.contains('discountsGood__img') || event.target.classList.contains('discountsGood__title')) {
            modalArr.push(createGoodModal(id, img, descriptionTop, descriptionConsistOf, descriptionCalories, descriptionRegion, price));
            renderGoodModal(modalArr);
                    modal.classList.add('modal__active');
                    modal.classList.remove('invisible')

                    container.classList.add('invisible')

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
    
            localArr.push(createCartGood(id, img, descriptionTop, price, quantity = 1));
            localStorage.setItem('cartGoods', JSON.stringify(localArr));

            console.log(localArr)
            cartQuantity.textContent = localArr.length;
            cartQuantityWrap.style.display = 'flex';
            const buyIconIn = catalogData.querySelector('.buyIconIn');
            console.log(buyIconIn)
            buyIconIn.classList.remove('invisible');
            // classList.add('active')
    
            console.log(localArr.length)
    
        }
    });
    latestList.addEventListener('click', (event) => {
        console.log('jr')
        const catalogData = event.target.closest('.latestGood');
        const id = catalogData.getAttribute('data-id');
        const price = catalogData.querySelector('.latestGood__price').textContent;
        const img = catalogData.querySelector('.latestGood__img').getAttribute('src');
        const descriptionTop = catalogData.querySelector('.latestGood__title').textContent;
        const descriptionConsistOf = catalogData.querySelector('.latestGood-description__consist').textContent;
        const descriptionCalories = catalogData.querySelector('.latestGood-description__calories').textContent;
        const descriptionRegion = catalogData.querySelector('.latestGood-description__region').textContent;

        if (event.target.classList.contains('latestGood__img') || event.target.classList.contains('latestGood__title')) {
            modalArr.push(createGoodModal(id, img, descriptionTop, descriptionConsistOf, descriptionCalories, descriptionRegion, price));
            renderGoodModal(modalArr);
            modal.classList.add('modal__active');
            container.classList.add('invisible')
            console.log(container)

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

    });

    
    const renderGoodModal = (arr) => {
    
        modal.innerHTML = '';
        modal.classList.add('scale-in-ver-bottom')

        modal.classList.remove('scale-out-ver-bottom')
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
    
            const modalDescription = document.createElement('p');
            modalDescription.classList.add('modalGood-description')
            modalInfo.append(modalDescription);

            const modalDescriptionTop = document.createElement('span');
            modalDescriptionTop.classList.add('modalGood-description__top');
            modalDescriptionTop.textContent = good.descriptionTop
            modalDescription.append(modalDescriptionTop);

            const modalDescriptionConsistOf = document.createElement('span');
            modalDescriptionConsistOf.classList.add('modalGood-description__consistOf');
            modalDescriptionConsistOf.textContent = good.descriptionConsistOf
            modalDescription.append(modalDescriptionConsistOf);

            const modalDescriptionCalories = document.createElement('span');
            modalDescriptionCalories.classList.add('modalGood-description__calories');
            modalDescriptionCalories.textContent = good.descriptionCalories
            modalDescription.append(modalDescriptionCalories);

            const modalDescriptionRegion = document.createElement('span');
            modalDescriptionRegion.classList.add('modalGood-description__consistOf');
            modalDescriptionRegion.textContent = good.descriptionRegion
            modalDescription.append(modalDescriptionRegion);
            
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
                modalArr = [];
                modal.classList.remove('scale-in-ver-bottom');
                modal.classList.add('scale-out-ver-bottom');
                modal.classList.remove('modal__active');
                modal.classList.add('modal');
                container.classList.remove('invisible')

            })
        })
    }
    modal.addEventListener('click', (element) => {
        if(element.target.classList.contains('buyBtn')) {
            const closest = element.target.closest('.modalGood');
            const id = closest.getAttribute('data-id');
            const img = closest.querySelector('.modalGood__img').getAttribute('src');
            const descriptionTop = closest.querySelector('.modalGood-description__top').textContent
            let price = closest.querySelector('.modalGood__price');
            price = parseInt(price.textContent.match(/\d+/));
            let quantity = closest.querySelector('.modalCounter');
            quantity = parseInt(quantity.textContent.match(/\d+/));
    
            localArr.push(createCartGood(id, img, descriptionTop, price, quantity));
            localStorage.setItem('cartGoods', JSON.stringify(localArr));
            console.log(localArr)
    
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
}

if (!JSON.parse(localStorage.getItem('cartGoods'))) {
    console.log('no')
    localStorage.setItem('cartGoods', JSON.stringify(localArr));
    localArr = JSON.parse(localStorage.getItem('cartGoods'));
    console.log(localArr)

    init(localArr)
   
} else {
    console.log('yes')
    localArr = JSON.parse(localStorage.getItem('cartGoods'));
    init(localArr) 
}







