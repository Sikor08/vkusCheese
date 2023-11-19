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
        img.classList.add('cartGood__img');

        cartGood.append(img);


        
        

        const cartGoodWrap = document.createElement('div');
        cartGoodWrap.classList.add('cartGoodWrap')
        cartGood.append(cartGoodWrap);

        const cartGoodTop = document.createElement('div');
        cartGoodTop.classList.add('cartGoodTop');
        cartGoodWrap.append(cartGoodTop)

        const title = document.createElement('p');
        title.classList.add('cartGood__title');
        title.textContent = obj.descriptionTop
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
            costSpanElem.textContent = `${costValue} р`;
            totalCost.textContent = `${culcTotal()} р`

        })
        let counter = document.createElement('span');
        counter.classList.add('cartGood__counter');
        counterValue = obj.quantity;
        counter.textContent = `${counterValue} шт`;
        stepper.append(counter);

        let costValue = counterValue * priceValue;
        costSpanElem.textContent = `${costValue} р`;


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
            costSpanElem.textContent = `${costValue} р`;
            totalCost.textContent = `${culcTotal()} р`

        })

        const delBtn = document.createElement('img');
        delBtn.setAttribute('src', 'img/icons/deleteIcon.svg')
        delBtn.classList.add('delBtn');
        cartGoodTop.append(delBtn);
        delBtn.addEventListener('click', () => {
            let index = arr.indexOf(obj);
                arr.splice(index, 1);
                localStorage.setItem('cartGoods', JSON.stringify(arr));
                renderCartGood(localArr);
                if (arr.length > 0) {
                    totalCost.textContent = `${culcTotal()} р`;
                    totalQuantity.textContent = `${localArr.length} шт`
                } else {
                    orderTotal.textContent = 'Сейчас в корзине нет товаров';
                    orderModal.classList.add('invisible')



                }
                if (isEmpty(localArr)) {
                    cartQuantityWrap.style.display = 'none';

                } else {
                    cartQuantityWrap.style.display = 'flex'
                    cartQuantity.textContent = localArr.length

                }
                cartQuantity.textContent = localArr.length
        } )
    })

}
renderCartGood(localArr);
const totalQuantity = document.querySelector('.totalQuantity__value')
const totalCost = document.querySelector('.totalCostWrap__value');
const orderTotal = document.querySelector('.orderTotal');
totalCost.textContent = culcTotal()
const orderModal = document.querySelector('.orderModal');
if (localArr.length > 0) {
    orderModal.classList.remove('invisible');
    totalQuantity.textContent = `${localArr.length} шт`
    totalCost.textContent = `${culcTotal()} р`
} else {
    orderTotal.textContent = `Сейчас в корзине нет товаров`;
    orderModal.classList.add('invisible')
}
const message = document.querySelector('.message')
const formSubmit = document.querySelector('.formSubmit');
formSubmit.style.opacity = .8;
const blockButton = () => {
    formSubmit.disabled = true
}

const unBlockButton = () => {
    formSubmit.disabled = false
}

const orderForm = document.forms.orderForm;
    let firstName = (orderForm.elements.fname);
    let phoneNumber = (orderForm.elements.tel);

    $(document).ready(function(){
        $('#phone-input').inputmask();
      });
    orderForm.addEventListener('keyup', (event) => {
        let regExpName = /^[а-яА-Я3-9_-]{3,16}$/;
        let regExpPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        if (!regExpName.test(firstName.value)) {
            firstName.classList.add('incorrect');

        } else {
            firstName.classList.remove('incorrect');

        }
        if (!regExpPhone.test(phoneNumber.value)) {
            phoneNumber.classList.add('incorrect');
        } else {
            phoneNumber.classList.remove('incorrect');

        }
        if(!regExpName.test(firstName.value) || !regExpPhone.test(phoneNumber.value)) {
            formSubmit.style.opacity = .8
            blockButton()
        } else {
            formSubmit.style.opacity = 1;
            unBlockButton()
        }
        
    })

    formSubmit.addEventListener('click' , async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('name', firstName.value);
    formData.append('phone', phoneNumber.value);
    formData.append('arrayGoods', JSON.stringify(localArr));


    const response = await fetch('../send.php',{
        method: 'POST',
        body: formData
    })

    if(response.ok) {
        localArr = [];
        localStorage.setItem('cartGoods', JSON.stringify(localArr));
        renderCartGood(localArr);
        orderForm.reset();
        orderTotal.textContent = `Сейчас в корзине нет товаров`;
        cartQuantityWrap.style.display = 'none';
        console.log('Card send')
    } else {
        console.log('ERROR RESPONSE:', response)
    }
});













