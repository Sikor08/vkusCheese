const catalogList = document.querySelector('.catalogList');
const modal = document.querySelector('.modal');
const cartList = document.querySelector('.cartList');
const catalogArr = [];
let catalogFiltered = [];
let modalArr = [];
let cartArr = []
// localStorage.setItem('cartGoods', JSON.stringify(local));





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
catalogList.addEventListener('click', (element) => {
    const catalogData = element.target.closest('.catalogGood');
    const id = catalogData.getAttribute('data-id');

    const title = catalogData.querySelector('.catalogGood__title').textContent;
    const price = catalogData.querySelector('.catalogGood__priceValue').textContent;
    const img = catalogData.querySelector('.catalogGood__img').getAttribute('src');
    const description = catalogData.querySelector('.catalogGood__description').textContent;
    if (element.target.classList.contains('catalogGood__img') || element.target.classList.contains('catalogGood__title')) {
        modalArr.push(createGoodModal(id, img, description, title, price));
        renderGoodModal(modalArr);
                modal.classList.add('modal__active');
    }
});

const searchCatalogData = document.querySelector('#searchCatalog')[0];
searchCatalogData.addEventListener('keyup', () => {
    let regexp = new RegExp((searchCatalogData.value).toLowerCase());
    console.log(regexp);
    const goods = document.querySelectorAll('.catalogGood__title');
    goods.forEach(item => {
        const filteredItem = regexp.test((item.textContent).toLowerCase());
        if(filteredItem !== true) {
            item.closest('.catalogGood').style.display = 'none'
        } else {
            item.closest('.catalogGood').style.display = 'block'
        }
    })
})

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
        byuBtn.textContent = 'В корзину';
        modalInfo.append(byuBtn);

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


if (localStorage.getItem('cartGoods')) {
    cartArr = JSON.parse(localStorage.getItem('cartGoods'));
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
        console.log(quantity)

        // if (localStorage.getItem('cartGoods'))
        // users = 
        JSON.parse(localStorage.getItem('cartGoods'));

        cartArr.push(createCartGood(id, img, title, price, quantity));
        console.log(cartArr)

        localStorage.setItem('cartGoods', JSON.stringify(cartArr));

    }
})





