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

getRandomNumber(maxNumber);

let newArray = Array.from(lottoSet);
let sorting = newArray.sort((a,b) => {
    return a-b;
});

console.log(sorting);