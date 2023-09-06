const catalogList = document.querySelector('.catalogList');
const basket = document.querySelector('.goodModal');
const catalogArr = [];
let catalogFiltered = [];
let modalArr = []

const getCatalogGoods = () => {
    fetch('https://raw.githubusercontent.com/Sikor08/EshopApi/master/goods.json').then(str => str.json()).then(data => data.forEach(good => {
        catalogArr.push(good);
        catalogFiltered.push(good);
        renderCatalogGood(catalogFiltered);
    })
    );
}
const renderCatalogGood = (arr) => {
    catalogList.innerHTML = ''
    arr.forEach(good => {
        const catalogGood = document.createElement('div');
        // catalogGood.setAttribute('href', 'goodsHtml/riet/' + good.id+ '.html');
        catalogGood.classList.add('catalog__link')
        const catalogGoodElem = document.createElement('li');
        catalogGoodElem.classList.add('catalogGood')

        catalogGoodElem.append(catalogGood)



        const catalogGoodImg = document.createElement('img');
        catalogGoodImg.setAttribute('src', good.img);
        catalogGoodImg.classList.add('catalogGood__img')
        catalogGood.append(catalogGoodImg);

        catalogList.append(catalogGoodElem)

        const catalogGoodInfo = document.createElement('div');
        catalogGoodInfo.classList.add('catalogGood__info')
        catalogGood.append(catalogGoodInfo)

        const titleElem = document.createElement('p');
        titleElem.classList.add('catalogGood__title')
        titleElem.textContent = good.title;
        catalogGoodInfo.append(titleElem)

        // const textElem = document.createElement('p');
        // textElem.classList.add('lGood__text');
        // textElem.textContent = good.text;
        // latestGoodInfo.append(textElem);

        const catalogPriceCartWrap = document.createElement('div');
        catalogPriceCartWrap.classList.add('catalogGood__priceCartWrap');
        catalogGoodInfo.append(catalogPriceCartWrap);

        const catalogGoodPriceElem = document.createElement('p');
        catalogGoodPriceElem.classList.add('catalogGood__price');
        catalogGoodPriceElem.textContent = 'за 1 шт'
        catalogPriceCartWrap.append(catalogGoodPriceElem);

        const catalogPriceValueElem = document.createElement('span');
        catalogPriceValueElem.classList.add('catalogGood__priceValue');
        catalogPriceValueElem.textContent = good.price;
        catalogGoodPriceElem.prepend(catalogPriceValueElem);

        const buyBtnImg = document.createElement('img');
        buyBtnImg.setAttribute('src', 'img/icons/cartGoodIcon.svg');
        catalogPriceCartWrap.append(buyBtnImg);


    })
}
catalogList.addEventListener('click', (element) => {

    const catalogData = element.target.closest('.catalogGood');
    const title = catalogData.querySelector('.catalogGood__title').textContent;
    const price = catalogData.querySelector('.catalogGood__price').textContent

    modalArr.push(createGoodModal(title, price));
    renderGoodModal(modalArr)

});
getCatalogGoods()

const searchCatalogData = document.querySelector('#searchCatalog')[0];
searchCatalogData.addEventListener('keyup', () => {
    let regexp = new RegExp(searchCatalogData.value);

    catalogFiltered = catalogArr.filter(item => regexp.test(item.title));
      renderCatalogGood(catalogFiltered)
})




const createGoodModal = ( title, price) => {
    return {
        title,
        price,
    }
}

const renderGoodModal = (arr) => {
    basket.innerHTML = ''
    arr.forEach(good => {
        const modalGood = document.createElement('div');
        const modalTitle = document.createElement('p');
        modalTitle.textContent = good.title;
        modalGood.append(modalTitle)
        const modalPrice = document.createElement('p');
        modalPrice.textContent = good.price;
        modalGood.append(modalPrice);
        basket.append(modalGood);
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'закрыть';
        modalGood.append(closeBtn);
        closeBtn.addEventListener('click', () => {
            modalGood.style.display = 'none';
            modalArr.splice(0, modalArr.length)
        })
    })
}

