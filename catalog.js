const catalogList = document.querySelector('.catalogList');
const catalogArr = [];

const getCatalogGoods = () => {
    fetch('catalog.json').then(str => str.json()).then(data => data.forEach(good => {
        catalogArr.push(good);
        renderCatalogGood(catalogArr);
    })
    );
}
const renderCatalogGood = (arr) => {
    catalogList.innerHTML = ''
    arr.forEach(good => {
        const catalogGoodElem = document.createElement('li');
        catalogGoodElem.classList.add('catalogGood')
        const catalogGoodImg = document.createElement('img');
        catalogGoodImg.setAttribute('src', good.img);
        catalogGoodImg.classList.add('catalogGood__img')
        catalogGoodElem.append(catalogGoodImg);

        catalogList.append(catalogGoodElem)

        const catalogGoodInfo = document.createElement('div');
        catalogGoodInfo.classList.add('catalogGood__info')
        catalogGoodElem.append(catalogGoodInfo)

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
        catalogPriceValueElem.textContent = '100р';
        catalogGoodPriceElem.prepend(catalogPriceValueElem);

        const buyBtnImg = document.createElement('img');
        buyBtnImg.setAttribute('src', 'img/cartGoodIcon.svg');
        catalogPriceCartWrap.append(buyBtnImg)
    })
}
getCatalogGoods()