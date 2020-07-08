## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

### Array

#### for of - 순회하기
Array의 순회(iterator) Array를 돌면서 어떤 값을 출력한다.

```js
// forEach 사용시
const data = [1,2,undefined,NaN,null,""];
data.forEach(function(value){
    console.log("value :", value);
})
```

```js
// for in 사용시
const data = [1,2,undefined,NaN,null,""];
for(let idx in data) {
    console.log(data[idx]);
}
```

###### for in을 사용할 경우 발생할 수 있는 문제
자신이 가지고 있는 오브젝트를 순회할 때 사용한다.
배열을 이용해도 문제 없이 작동하지만, 자신이 가지고 있지 않은 상위의 추가된 값들까지 포함해서 결과를 나타낼 수 있다.

```js
// for in의 문제점
const data = [1,2,undefined,NaN,null,""];
Array.prototype.getIndex = function(){};
for(let idx in data) {
    console.log(data[idx]); // 기존과 다르게 function(){} 이 추가된다.
}
```
`Array.prototype.getIndex`를 추가하면서 `for in`은 자기 자신이 가지고 있는 객체 이외에
`prototype`객체를 이용해서 상위의 추가된 객체들도 나타내게된다.
그러므로, for in을 Array에서 쓰면 안된다.

네이티브에 메소드를 추가해서 확장할시에 위의 문제가 발생할 수 있다.

```js
// for of 사용시
const data = [1,2,undefined,NaN,null,""];

Array.prototype.getIndex = function(){};

for(let value of data) {
    console.log(value); // 기존과 다르게 function(){} 이 추가된다.
}
```

`for of`을 사용하여 `value` 값을 이용해서 바로 확인할 수 있다.
`for in`에 대한 실수를 줄이기 위해 `for of`가 나왔고 `for` `forEach` 말고도 배열을 순회할 수 있는 방법이 나왔다.

#### spread oerator - 배열의 복사
spread oerator (펼침연산자)

```js
let pre = ["apple", "orange", 100];
let newData = [...pre]; // pre를 펼쳐서 보여준다. pre를 똑같이 쓰는거다.

console.log(pre); // (3) ["apple", "orange", 100];
console.log(newData); // (3) ["apple", "orange", 100];
console.log(pre === newData); // false
```

`pre`, `newData`는 전혀 다른 데이터이다.
정확히 `newData`는 `pre`의 참조를 끊고 메모리의 새로운 공간에 새로운 배열로 들어갔다.
`concat()` 처럼 복사를 했다고 생각하면 된다.

#### spread oerator - 몇가지 활용
```js
let pre = [100, 200, "hello", null];
let newData = [0,1,2,3, ...pre ,4];

console.log(newData); //[0,1,2,3,100,200,"hello",null,4];

```

`newData`는 spread oerator를 이용하여 `pre`의 데이터를 배열의 특정 구역에 넣어서 합칠 수 있다.

개별 파라미터로 값을 전달할 수 있다.

```js
function sum(a,b,c) {
    return a+b+c;
}

let pre = [100,200,300];

console.log(sum(pre[0],pre[1],pre[2])) //같이 할 필요가 없다.
```

배열 그대로를 전달해주고 싶을때 `apply()`를 사용할 수 있다.
`apply()`를 사용하면 두번째 인자의 값을 배열로 받기 때문에 펼쳐지면서 a,b,c로 들어가게된다.

```js
function sum(a,b,c) {
    return a+b+c;
}

let pre = [100,200,300];

console.log(sum.apply(null, pre)); // 600
console.log(sum(...pre)); // 600 apply를 사용하지 않고 spread operator를 사용하면 바로 계산할 수 있다.
```
배열 형태 인자값을 펼쳐서 주면 되는 상황에서 spread operator를 사용하면 손쉽게 처리할 수 있다.
spread operator는 배열을 바꾸지 않고 새로운 값을 복사하는 방법을 기본적으로 제공하고 배열을 합치거나 펼쳐진 상태로 새로운 함수의 파라미터로 전달할때 유용하게 사용할 수 있다.


#### from 메소드로 진짜 배열 만들기

```js
function addMark() {
    let newData = [];

    for(let i=0; i<arguments.length; i++) {
        newData.push(arguments[i] + "!"); // 인자값에 "!"를 붙여서 반환
    }
    console.log(newData);
}

addMark(1,2,3,4,5);
```

인자값을 안줘도 arguments와 같은 `function()` 안에있는 내부 지역변수와 같은 특별한 값을 이용하여,
객체인 `arguments` 안에 있는 값을 이용하여 인자값들을 배열과 비슷한 형태로 값이 들어가게된다.

`arguments`는 가변적인 파라미터가 들어오는 경우에 권장하는 패턴은 아니지만 가끔 쓰인다.
개수가 몇개가 될지 모를때 유용하게 사용할 수 있다.

```js
function addMark() {

    let newData = arguments.map(function(value) {
        return value + "!";
    });

    console.log(newData); // arguments는 배열이 아니므로 map()을 사용할 수 없어서 에러가 출력된다.
}

addMark(1,2,3,4,5);
```
`map()`을 사용하면 배열을 순회하면서 필요한 값을 추가하면서 새로운 배열을 반환하므로 쉬운 결과물을 얻을 수 있다.

위의 코드는 이론상 arguments를 이용하여 map() 메소드를 이용하여 순회하면서 각 값을 추가하여 새로운 배열을 반환한다. 
arguments는 배열과 같은 모양이지만 배열이 아니라서 map()을 사용할 수 없다.

###### 유사 배열 객체
arguments

Nodelist[] // document.querySelectorAll("li")

let yoosa = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};

###### map() 메소드
배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환한다.
```
const array1 = [1, 4, 9 ,16];
```

```js
function addMark() {

    let newArray = Array.from(arguments) // newArray를 arguments로 부터 배열을 만든다.

    let newData = newArray.map(function(value) {
        return value + "!";
    });

    console.log(newData); // 정상적으로 출력된다.
}

addMark(1,2,3,4,5);
```

`from()` 메소드를 이용하여 가짜 배열들을 진짜 배열로 바꿔주는 작업을 쉽게 할수있다.
`from()` 메소드는 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운 Array 객체를 만든다.

