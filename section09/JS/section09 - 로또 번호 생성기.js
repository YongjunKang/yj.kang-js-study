const SETTING = {
    name : "LUCKY LOTTO!",
    count : 6,
    maxNumber : 45
};

let {count, maxNumber} = SETTING;
let lottoSet = new Set();

function getRandomNumber(maxNumber) {
    let num = Math.floor(Math.random() * maxNumber) + 1; // 1~45만 뽑는다.
        if(!lottoSet.has(num)) {
            lottoSet.add(num);
        }
}

for(let i=0; i<count; i++) {
    getRandomNumber(maxNumber);
}

console.log(lottoSet.values());