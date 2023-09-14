const catalogList = document.querySelector('.catalogList');
const modal = document.querySelector('.modal');
const catalogArr = [];
let catalogFiltered = [];
let modalArr = []

// const getCatalogGoods = () => {
//     fetch('https://raw.githubusercontent.com/Sikor08/EshopApi/master/goods.json').then(str => str.json()).then(data => data.forEach(good => {
//         catalogArr.push(good);
//         catalogFiltered.push(good);
//         renderCatalogGood(catalogFiltered);
//     })
//     );
// }
// const renderCatalogGood = (arr) => {
//     catalogList.innerHTML = ''
//     arr.forEach(good => {
//         const catalogGood = document.createElement('div');
//         // catalogGood.setAttribute('href', 'goodsHtml/riet/' + good.id+ '.html');
//         catalogGood.classList.add('catalog__link')
//         const catalogGoodElem = document.createElement('li');
//         catalogGoodElem.classList.add('catalogGood')

//         catalogGoodElem.append(catalogGood)



//         const catalogGoodImg = document.createElement('img');
//         catalogGoodImg.setAttribute('src', good.img);
//         catalogGoodImg.classList.add('catalogGood__img')
//         catalogGood.append(catalogGoodImg);

//         catalogList.append(catalogGoodElem)

//         const catalogGoodInfo = document.createElement('div');
//         catalogGoodInfo.classList.add('catalogGood__info')
//         catalogGood.append(catalogGoodInfo)

//         const titleElem = document.createElement('p');
//         titleElem.classList.add('catalogGood__title')
//         titleElem.textContent = good.title;
//         catalogGoodInfo.append(titleElem)

//         const description = document.createElement('p');
//         description.classList.add('catalogGood__description');
//         description.textContent = good.description;
//         catalogGoodInfo.append(description)

//         // const textElem = document.createElement('p');
//         // textElem.classList.add('lGood__text');
//         // textElem.textContent = good.text;
//         // latestGoodInfo.append(textElem);

//         const catalogPriceCartWrap = document.createElement('div');
//         catalogPriceCartWrap.classList.add('catalogGood__priceCartWrap');
//         catalogGoodInfo.append(catalogPriceCartWrap);

//         const catalogGoodPriceElem = document.createElement('p');
//         catalogGoodPriceElem.classList.add('catalogGood__price');
//         catalogGoodPriceElem.textContent = 'за 1 шт'
//         catalogPriceCartWrap.append(catalogGoodPriceElem);

//         const catalogPriceValueElem = document.createElement('span');
//         catalogPriceValueElem.classList.add('catalogGood__priceValue');
//         catalogPriceValueElem.textContent = good.price;
//         catalogGoodPriceElem.prepend(catalogPriceValueElem);

//         const buyBtnImg = document.createElement('img');
//         buyBtnImg.setAttribute('src', 'img/icons/cartGoodIcon.svg');
//         catalogPriceCartWrap.append(buyBtnImg);


//     })
// }
const createGoodModal = (img ,description, title, price) => {
    return {
        img,
        description,
        title,
        price,
    }
}
catalogList.addEventListener('click', (element) => {

    const catalogData = element.target.closest('.catalogGood');
    const title = catalogData.querySelector('.catalogGood__title').textContent;
    const price = catalogData.querySelector('.catalogGood__priceValue').textContent;
    const img = catalogData.querySelector('.catalogGood__img').getAttribute('src');
    const description = catalogData.querySelector('.catalogGood__description').textContent
    if (element.target.classList.contains('catalogGood__img') || element.target.classList.contains('catalogGood__title')) {
        modalArr.push(createGoodModal(img, description, title, price));
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
        modalGood.classList.add('modalGood')

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
        counter.classList.add('counter')
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
        modalInfo.append(byuBtn)

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

