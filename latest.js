const goodsArr = [];
const latest = document.querySelector('.latestList')

const getGood =fetch('latest.json').then(str => str.json()).then(data => data.forEach(good => {
    goodsArr.push(good);
})
);
console.log(goodsArr)
