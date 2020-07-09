## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### 섹션6

##### Object
ES6에서 개선된 Object 선언 방법에 대해서 알아보려고 한다.

```js
const name = "Kang";
const age = 26;

const obj = {
    name : name,
    age : age,
};

console.log(obj) //{name: "Kang", age: 26} Key와 Value
```

```js
function getObj() {
    const name = "Kang";

    const getName = function() {
        return name;
    }

    const setName = function(newname) {
        name = newname;
    }

    const printName = function() {
        console.log(name);
    }

    return { //getObj를 새로운 오브젝트 형태로 반환하고 싶다.
        getName : getName,
        setName : setName 
    }
}

let obj = getObj();
console.log(obj); // {getName: f(), setName: f(newname)} 형태로 출력
console.log(obj.getName()); // Kang
```

`return { getName : getName, setName : setName }`과 같은 형태를 오브젝트 리터럴 형태라고 한다.

오브젝트 리터럴 형태를 반환할때 똑같은 이름을 쓰고 있으면 불필요하다.
다른 `key` 값이 아니라 `key` 이름과 `value`가 동일하다면

```js
return {getName, setName};
```
위 코드와 같이 간단하게 처리할 수 있다.
오브젝트 리터럴이 편리한 이유는 `{name}`과 같은 `value`도 넘길 수 있다.

```js
const data = {
    name,
    getName() { // function 없이 만들 수 있다.

    },
    age
}
```
위 코드와 같이 오브젝트를 선언할때 위에 어떤 값이 있다면 간단하게 만들 수도 있다.


###### 객체 리터럴(Object literal)

```js
let obj = {}; //ES6

var obj = new Object(); // 기존의 방식
```

Object 객체를 생성함에 있어 객체의 구조를 정의하고 생성하는 구문을 하나로 합칠 수 있어 기존의 new와 Object 생성자를 이용해 객체를 생성하고 필요한 구조를 마들어가는 과정을 조금 더 간소화 할 수 있다.

그래서 코드가 간결해지고 가독성(readability)이 높아진다.

```js
// 객체 리터럴을 이용해 객체를 만드는 방법
let obj = {
    name: "kang",
    age: 26,
};
console.log(obj); // {name: "Kang", age: 26}

// 전체 객체의 멤버가 중괄호({}) 내부에 콤마(,)로 구분되어 있다.
// 각 멤버는 콜론(:)으로 이름(Key)과 초기값(Value)로 구분되어 있다.
```

```js
// 기존의 방식
var obj = new Object(); // 변수 obj에 빈 Object 객체를 저장
    obj.name = "Kang"; // 프로퍼티 추가
    obj.age = 26; // 프로퍼티 추가

console.log(obj); //{name: "Kang", age: 26}
```

객체 리터럴을 사용해 객체를 생성하는 방법은 내부적으로 new Object를 수행한 후 멤버를 구성하는 방법과 동일한 과정을 따른다.

이렇게 정의된 멤버는 모두 외부에서 접근할 수 있는 공개 멤버이다.
-> 기본적으로 자바스크립트에서 객체 프로퍼티는 모두 공개
이 방법을 이용해서는 비공개 멤버를 구현할 수 없다.

###### 프로퍼티(property)는 어떤 값을 나타낸다.
그 어떤 값이 다른 값과 연관을 가지고 있을때 프로퍼티라 한다.
에시로 문자열에 `length`라는 프로퍼티가 있는데 `length`는 문자열 안에 있는 문자의 양을 정수로 나타낸 값을 담고 있다.

즉 데이터 구조와 연관된 속성을 나타낸다.

+ 인스턴스 property들은 특정 object 인스턴스의 특정한 데이터를 가지고 있습니다.
+ Static Property들은 모든 object 인스턴스들에게 공유 된 데이터를 가지고 있습니다.
```