let arr = Array.from("12345");
console.log(arr); //[1,2,3,4,5]

let arr2 = Array.from("abcde");
console.log(arr2);  //[a,b,c,d,e]

console.log(Array.from([1, 2, 3], x => x + x));
// 화살표 함수를 이용하면 [2, 4, 6] 의 값을 얻을 수 있다.


// 유사배열 arguments 를 배열로 바꾸기
function addMark() {
    let newArray = Array.from(arguments);
    let newData = newArray.map(function(value) {
        // return value + "*"; 1*, 2*, 3* ... 으로 추가 된다.
        return value;
    });
    console.log(newData);
}
addMark(1,2,3,4,5);