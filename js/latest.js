const goodsArr = [];
const latest = document.querySelector('.latestList')

const getGood = () => {
    fetch('https://raw.githubusercontent.com/Sikor08/EshopApi/master/latest.json').then(str => str.json()).then(data => data.forEach(good => {
        goodsArr.push(good);
        renderGood(goodsArr)
    
    })
    )
}
console.log(goodsArr)
const renderGood = (arr) => {
    latest.innerHTML = ''
    arr.forEach(good => {
        const latestGoodElem = document.createElement('li');
        latestGoodElem.classList.add('latestGood')
        const latestGoodImg = document.createElement('img');
        latestGoodImg.setAttribute('src', good.img);
        latestGoodImg.classList.add('latestGood__img')
        latestGoodElem.append(latestGoodImg);

        latest.append(latestGoodElem)

        const latestGoodInfo = document.createElement('div');
        latestGoodInfo.classList.add('latestGood__info')
        latestGoodElem.append(latestGoodInfo)

        const titleElem = document.createElement('h4');
        titleElem.classList.add('latestGood__title')
        titleElem.textContent = good.title;
        latestGoodInfo.append(titleElem)

        const textElem = document.createElement('p');
        textElem.classList.add('latestGood__text');
        textElem.textContent = good.text;
        latestGoodInfo.append(textElem);

        const priceCartWrap = document.createElement('div');
        priceCartWrap.classList.add('priceCartWrap');
        latestGoodInfo.append(priceCartWrap);

        const latestGoodPriceElem = document.createElement('p');
        latestGoodPriceElem.classList.add('latestGood__price');
        latestGoodPriceElem.textContent = 'за 100 гр'
        priceCartWrap.append(latestGoodPriceElem);

        const priceValueElem = document.createElement('span');
        priceValueElem.classList.add('latestGood__priceValue');
        priceValueElem.textContent = good.price;
        latestGoodPriceElem.prepend(priceValueElem);

        const buyBtnImg = document.createElement('img');
        buyBtnImg.setAttribute('src', 'img/icons/cartGoodIcon.svg');
        priceCartWrap.append(buyBtnImg)
    })
}
getGood()
