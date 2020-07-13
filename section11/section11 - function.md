## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### Function

##### Arrow function 활용

```js
setTimeout(function() { //`sertTimeout()`의 첫번째 인자로 들어가 나중에 실행된다.
    console.log("settimeout");
}, 1000); // 1초후 실행
```

`setTimeout()`은 대표적인 콜백함수이다.
콜백함수 => 나중에 실행되는 함수

```js
setTimeout( () => {
    console.log("settimeout arrow");
}, 1000);
```

`Arrow Function`을 활용하여 축약 표현할 수 있다.

```js
// 일반적인 콜백함수
let newArr = [1,2,3,4,5].map(function(value, index, object){
    return value * 2;
})

console.log(newArr); // [2,4,6,8,10]
```

```js
// function 축약 가능
let newArr = [1,2,3,4,5].map((v)=> {
    return v * 2;
});

console.log(newArr);
```

```js
// return 생략 가능
let newArr = [1,2,3,4,5].map((v) => v*2); //(v*2) 도 가능하다. return을 의미한다.

console.log(newArr);
```

##### Arrow function의 this context

```js
//this context of function
const myObj = {
    runTimeout() {
        setTimeout(function() {
            //console.log(this === window);
            this.printData();
            // this가 가리키는것은 window 이므로 printData() not a function error
        }.bind(this), 200); //bind로 감싸주면 실행된다.
    },

    printData() {
        console.log("hi codesquad!");
    }
}

myObj.runTimeout(); // true
```

```js
//this context of Arrow function
const myObj = {
    runTimeout() {
        setTimeout(() => {
            console.log(this === window); // false
            this.printData(); // bind를 생략해도 printData()를 불러온다.
        }, 200);
    },

    printData() {
        console.log("hi codesquad!");
    }
}

myObj.runTimeout();
```

`Arrow function`의 this가 가리키는건 window가 아니라,
this가 가리키는 컨텍스트가 실행타이밍을 가리킨다.

이벤트 큐에 있다가 나중에 컨텍스트를 유지하면서 실행된다.

```js
const myObj = {
    register() { // myObj 안의 함수
       el.addEventListener("click", (evt) => { // 콜백함수
           this.printData(evt.target); // bind 없이 this가 가리키는게 선언된 부분을 가리킨다.
    });
   },

   printData() {
       console.log('clicked!!', el.innerText);
   } 
}

myObj.register();
```

##### function default parameters

```js
function sum(value, size) {
    return value * size;
}

console.log(sum(3)); // 인자를 하나 빼면 NaN
```

```js
function sum(value, size={value:1}) { // default parameters
    return value * size.value;
}

console.log(sum(3,{value:0})); // value를 빼면 위의 기본 오브젝트 형태 1로 적용된다.
```

##### rest parameters
spread operator 와 비슷한 형태지만 다르다.

```js
// 예전 방법
function checkNum() {
    const argArray = Array.prototype.slice.call(arguments);
    console.log(argArray); // [10, 2, 3, 4, 5, "55"]
    console.log(toString.call(arguments)) // [object Arguments];
    const result = argArray.every((v) => typeof v === "number"); // every는 값이 true일때만 true를 반환한다.
    console.log(result); // false "55"
}

// const result = checkNum(10,2,"55") // n개의 인자가 넘어 올때 checkNum()이 어떻게 처리해야 하나
const result = checkNum(10,2,3,4,5,"55"); // "55"로 인해 false
```

```js
//ES6
function checkNum(...argArray) {
    console.log(toString.call(argArray)); // [object Array]
    const result = argArray.every((v) => typeof v === "number")
    console.log(result); // false
}
const result = checkNum(10,2,3,4,false);
```

배열로 함수에서 처리를 할때 레스트 파라미터를 이용하면 된다. `...argArray`
매개변수에 `...`이 들어갔다 => 배열로 받겠다.