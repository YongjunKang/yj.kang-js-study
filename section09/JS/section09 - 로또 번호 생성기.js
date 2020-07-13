const SETTING = {
    name : "LUCKY LOTTO!",
    count : 6,
    maxNumber : 45
};

let {count, maxNumber} = SETTING;
let lottoSet = new Set();

function getRandomNumber(maxNumber) {
    let num = Math.floor(Math.random() * maxNumber) + 1;
    if(num <= maxNumber) {
        lottoSet.add(num);
    }
}

for(let i=0; i<count; i++) {
    getRandomNumber(maxNumber);
}

console.log(lottoSet.values());