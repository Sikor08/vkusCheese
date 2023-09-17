let arr = JSON.parse(localStorage.getItem('cartGoods'));
const cartList = document.querySelector('.cartList')

const renderCartGood = (arr) => {
    cartList.innerHTML = ''
    arr.forEach(obj => {
        const cartGood = document.createElement('li');
        cartGood.classList.add('cartGood');
        cartList.append(cartGood);

        const img = document.createElement('img');
        img.setAttribute('src', obj.img);
        img.classList.add('cartGood__img')
        cartGood.append(img);

        const title = document.createElement('p');
        title.classList.add('cartGood__title');
        title.textContent = obj.title
        cartGood.append(title);
        
    })
}

renderCartGood(arr)