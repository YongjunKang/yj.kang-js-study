/* # Array 순회 */

//for 사용시
const data = [1,2,undefined,NaN,null,""];
for(let i=0; i<data.length; i++) {
    console.log(data[i]); // 1, 2, undefined, NaN, null ""
}

//forEach 사용시
const data = [1,2,undefined,NaN,null,""];
data.forEach(function(value){
    console.log("value :", value); // value : 1 ....
})

// for in 사용시
const data = [1,2,undefined,NaN,null,""];
for(let idx in data) {
    console.log(data[idx]);
}

// for of 사용시
const data = [1,2,undefined,NaN,null,""];
for(let value of data) {
    console.log(value); // 기존과 다르게 function(){} 이 추가된다.
}


// for of는 배열 말고도 문자열 순회시에도 사용할수도 있다..
const str = "hello world";
for(let value of str) {
    console.log(value);
}
