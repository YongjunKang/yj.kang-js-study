const SETTING = {
    name : "LUCKY LOTTO!",
    count : 6,
    maxNumber : 45
};

let {count, maxNumber} = SETTING;
let lottoSet = new Set();

function getRandomNumber(maxNumber) {
    while(lottoSet.size < count) {
      let num = Math.floor(Math.random() * maxNumber) + 1; // 1~45만 뽑는다.
        if(!lottoSet.has(num)) {
            lottoSet.add(num);
        }
    }    
}

for(let i = 0; i < count; i++) {
    getRandomNumber(maxNumber);
}

function sort1(a, b) { // 한자리 숫자가 앞으로 오게
    return a-b;
}

let newArray = Array.from(lottoSet);
let sorting = newArray.sort(sort1);

console.log(sorting);