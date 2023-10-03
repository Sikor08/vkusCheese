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
const totalCostElem = document.querySelector('.totalCostValue');

let localArr = JSON.parse(localStorage.getItem('cartGoods'));
const cartContent = document.querySelector('.cartContent')
const cartList = document.querySelector('.cartList');

const cartQuantityWrap = document.querySelector('.cartQuantityWrap');
let cartQuantity = document.querySelector('.cartQuantity');
cartQuantity.textContent = localArr.length



const culcTotal = () => {
    let testArr = [];
    let sum;
    let costs = document.querySelectorAll('.cartGood__costValue')
    costs.forEach(item => {
    let costValue = parseInt(item.textContent.match(/\d+/));
    testArr.push(costValue);
    sum = testArr.reduce((sum, item) => sum + item);
    
})
return sum
}

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
    cartQuantityWrap.style.display = 'flex'
}



const renderCartGood = (arr) => {
    cartList.innerHTML = '';

  

    arr.forEach(obj => {
        const cartGood = document.createElement('li');
        cartGood.classList.add('cartGood');
        cartGood.setAttribute('data-id', obj.id)
        cartList.append(cartGood);

        const img = document.createElement('img');
        img.setAttribute('src', obj.img);
        img.classList.add('cartGood__img')
        cartGood.append(img);

        const cartGoodWrap = document.createElement('div');
        cartGoodWrap.classList.add('cartGoodWrap')
        cartGood.append(cartGoodWrap);

        const cartGoodTop = document.createElement('div');
        cartGoodTop.classList.add('cartGoodTop');
        cartGoodWrap.append(cartGoodTop)

        const title = document.createElement('p');
        title.classList.add('cartGood__title');
        title.textContent = obj.title
        cartGoodTop.append(title);

        const cartGoodBottom = document.createElement('div');
        cartGoodBottom.classList.add('cartGoodBottom');
        cartGoodWrap.append(cartGoodBottom);

        const priceWrap = document.createElement('div');
        priceWrap.classList.add('priceWrap');
        cartGoodBottom.append(priceWrap)

        const price = document.createElement('p');
        price.classList.add('cartGood__price');
        price.textContent = `${obj.price} за 1 шт`;
        let priceValue = parseInt(price.textContent.match(/\d+/));
        cartGoodBottom.append(price);
        priceWrap.append(price);  

        const cost = document.createElement('p');
        cost.classList.add('cartGood__cost');
        cost.textContent = 'Итого: '
        const costSpanElem = document.createElement('span');
        costSpanElem.classList.add('cartGood__costValue');
        cost.append(costSpanElem)
        priceWrap.append(cost)

        const stepper = document.createElement('div');
        stepper.classList.add('cartGood__stepper');
        cartGoodBottom.append(stepper)

        const minusBtn = document.createElement('button');
        minusBtn.classList.add('cartGood__btn');
        minusBtn.classList.add('minusBtn')
        minusBtn.textContent = '-';
        stepper.append(minusBtn);
        
        minusBtn.addEventListener('click', () => {
            counterValue--;
            counterValue <= 1 ? counterValue = 1 : counterValue;
            counter.textContent = `${counterValue} шт`;
            costValue = counterValue * priceValue;
            costSpanElem.textContent = `${costValue} шт`;
            totalCost.textContent = `Итого:${culcTotal()} р`

        })
        let counter = document.createElement('span');
        counter.classList.add('cartGood__counter');
        counterValue = obj.quantity;
        counter.textContent = `${counterValue} шт`;
        stepper.append(counter);

        let costValue = counterValue * priceValue;
        costSpanElem.textContent = `${costValue} шт`;


        const plusBtn = document.createElement('button');
        plusBtn.classList.add('cartGood__btn');
        plusBtn.classList.add('plusBtn');
        plusBtn.textContent = '+';
        stepper.append(plusBtn);

        plusBtn.addEventListener('click', () => {
            ++counterValue;
            counterValue >= 5 ? counterValue = 5 : counterValue;
            obj.quantity = counterValue;
            localStorage.setItem('cartGoods', JSON.stringify(arr));

            counter.textContent = `${counterValue} шт`;
            costValue = counterValue * priceValue;
            costSpanElem.textContent = `${costValue} шт`;
            totalCost.textContent = `Итого: ${culcTotal()} р`

        })

        const delBtn = document.createElement('img');
        delBtn.setAttribute('src', 'img/icons/deleteIcon.svg')
        delBtn.classList.add('delBtn');
        cartGoodTop.append(delBtn);
        delBtn.addEventListener('click', () => {
            console.log(arr)
            let index = arr.indexOf(obj);
                arr.splice(index, 1);
                localStorage.setItem('cartGoods', JSON.stringify(arr));
                renderCartGood(arr);
                if (arr.length > 0) {
                    totalCost.textContent = `Итого: ${culcTotal()} р`;

                } else {
                    totalCost.textContent = `Корзина пуста`;
                    orderModal.classList.add('invisible');


                }
                if (isEmpty(localArr)) {
                    cartQuantityWrap.style.display = 'none'
                } else {
                    cartQuantityWrap.style.display = 'flex'
                    cartQuantity.textContent = localArr.length

                }
                cartQuantity.textContent = localArr.length
        } )
    })

}
renderCartGood(localArr);

const totalCost = document.createElement('div');
totalCost.classList.add('totalCost');
totalCost.textContent = 'Итого: '
const totalCostValue = document.createElement('span');
totalCostValue.classList.add('totalCostValue');
const orderModal = document.querySelector('.orderModal');
if (localArr.length > 0) {
    orderModal.classList.remove('invisible');
    totalCost.textContent = `Итого: ${culcTotal()} р`
} else {
    totalCost.textContent = `Корзина пуста`;
    orderModal.classList.add('invisible');


}
totalCost.append(totalCostValue)
cartContent.append(totalCost);
// import  {sayHi}  from './burger.js';
// sayHi();




