## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### 객체

##### class 를 통한 객체생성

원래 클래스가 존재하지 않지만 클래스라는 키워드가 생겼다.

```js
// ES6
function Health() {
    this.name = name;
}

Health.prototype.showHealth = function() {
    console.log(this.name + "님 안녕하세요");
}

const h = new Health("Kang");
h.showHealth();
```

효율적인 객체를 프로토타입안에 두면서 객체를 제너레이터 해준다.
`new` 키워드를 불렀을때 `this`의 프로토타입 메소드, 속성들을 묶어서 객체를 만들어서 `h`로 할당한다.

```js
class Health {
    constructor(name, lastTime) {
        this.name = name;
        this.lastTime = lastTime;
    }

    showHealth() { // 함수
        console.log("안녕하세요" + this.name);
    }
}

const myHealth = new Health("Kang");
myHealth.showHealth(); // 안녕하세요Kang
console.log(myHealth); // [object Object] {lastTime: undefined, name:"Kang"}
```

###### constructor
자바스크립트의 생성자 함수이다.
객체를 생성하는 함수를 생성자 함수라고 한다.

위의 예제 코드와 동일하다.
`showHealth()` 는 프로토타입에 저장된다.
`Health` 도 클래스이지만 내부적으로는 함수로 처리된다.

`console.log(myHealth);`를 확인해보면 `__proto__` 안에 `showHealth`가 들어있다.
`console.log(toString.call(Health));` => [object Function]

모습만 클래스인 함수이다.

----

##### Object assign으로 JS객체 만들기

```js
// ES5 Object create
// new 키워드를 통해 생성자를 만들지 않고 순수한 오브젝트를 만들 수 없을까 해서 나온 방법

const healthObj = {
    showHealth : function() {
        console.log("오늘 운동시간 : " + this.healthTime);
    }
}

const myHealth = Object.create(healthObj) // healthObj로 오브젝트를 만든다.
myHealth.healthTime = "11:20"; // 추가할 수 있다.
myHealth.name = "Kang";

console.log(myHealth); // [object Object] {healthTime:"11:20", name:"Kang", __proto__ => showHealth: f}
```

`myHealth`가 일반 오브젝트에 같이 포함된게 아니라 프로토타입 객체에 들어갔다.

`new` 키워드를 써서 함수를 만들고 생성자안에 프로토타입은 `showHealth()` 라고 해서 만들었던 방법을 `Object.create`로 쉽게 객체를 만들 수 있다.

```js
//Object assign

const healthObj = {
    showHealth : function() {
        console.log("오늘 운동시간 : " + this.healthTime);
    }
}

const myHealth = Object.assign(Object.create(healthObj), { // 프로토타입 객체에 넣을 것
    name : "Kang", // object.assign 객체에 필요한 속성값
    healthTime : "11:20",
});

console.log(myHealth); // [object Object] {healthTime:"11:20", name:"Kang", __proto__ => showHealth: f}
```

`Object.create`코드와 동일한 결과를 얻을 수 있다.

###### Object.assign()
열거할 수 있는 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용한다.
대상 객체를 반환한다.

----

##### Object assign으로 Immutable 객체만들기

```js
const previousObj = {
    name : "Kang",
    lastTime : " 11:20"
};

const myHealth = Object.assign({}, previousObj, {
    "lastTime" : "12:30", // 새로운 값이 있으면 이 값으로 대체한다.
    "age" : 26 // 없는 값은 추가된다.
});

console.log(myHealth); //{lastTime: "12:30", name: "Kang"}
```

`Object.assign`은 Immutable 객체, 새로운 객체를 만드는 방법으로도 사용할 수 있다.
이전의 객체를 불러오거나, 새로운 객체를 추가할 수 있다. `{}` 자리에 값을 써주면 프로토타입으로 들어갈 수 있다.

`previousObj` 와 `myHealth` 를 콘솔로 띄워보면 전혀 같은 값이 아니다.
`console.log(previousObj === myHealth);` // false (객체를 복사해서 새로운 객체를 반환하기 때문이다.)
참조 값을 비교하면 true가 반환된다.

----

##### Object setPrototypeOf로 객체 만들기
`Object.setPrototypeOf()` 메소드는 지정된 객체의 프로토타입을 다른 객체 또는 null로 설정한다.

```js
const healthObj = {
    showHealth : function() {
        console.log("오늘 운동시간 : " + this.healthTime);
    },
    setHealth : function(newTime) {
        this.healthTime = newTime;
    }
}

const myHealth = {
    name : "Kang",
    healthTime : "11:20",
};

Object.setPrototypeOf(myHealth, healthObj); // 2번째에 프로토타입 객체 지정
//myHealth 객체에 프로토타입으로 healthObj를 지정한다.

console.log(myHealth); // myHealth 객체 아래 프로토타입으로 healthObj, myHealth가 추가된다.
```

`Object.assign`이 객체를 복사해서 새로운 객체로 반환한다면,
`Object.setPrototypeOf()`은 Prototype 객체에만 추가하는 것이라 단순하고 명확한 기능을 제공한다.

```js
const healthObj = {
    showHealth : function() {
        console.log("오늘 운동시간 : " + this.healthTime);
    },
    setHealth : function(newTime) {
        this.healthTime = newTime;
    }
}

const newObj = Object.setPrototypeOf({
    name : "Kang",
    lastTime : "11:20"
}, healthObj);

console.log(newObj); // newObj 객체 아래 프로토타입으로 healthObj, myHealth가 추가된다.
```

`.__proto__` 가 이전까지 비표준, 내부에 있으므로 함부로 참조금지.
__ 는 private 한 속성을 표현할때 사용한다.
성능상 문제로 쓰는걸 자제하라는 자료가 있다.

대신에 `setPrototypeOf()`를 사용해서 객체안에 프로토타입 객체를 이용해서 오브젝트를 만드는 방법을 대체할 수 있다.

----

##### Object setPrototypeOf 로 객체간 prototype chain 생성하기

```js
//setPrototypeOf

//parent
const healthObj = {
    showHealth : function() {
        console.log("오늘 운동시간 :" + this.healthTime);
    },
    setHealth : function(newTime) {
        this.healthTime = newTime;
    }
}

//child obj
const healthChildObj = {
    getAge : function() { // 자식 역할을 하는 메소드
        return this.age;
    }
}

const childObj = Object.setPrototypeOf({
    age : 22
}, healthChildObj); // healthChildObj가 들어간다.

console.log(childObj); // 부모와 전혀 상관없이 동작한다.
// { age:22, getAge가 프로토타입 객체로 추가된다.}
```

```js
// 이미 구성된 다른쪽의 오브젝트를 쓰고 싶을 때
//setPrototypeOf Chain

//parent
const healthObj = {
    showHealth : function() {
        console.log("오늘 운동시간 :" + this.healthTime);
    },
    setHealth : function(newTime) {
        this.healthTime = newTime;
    }
}

//child obj
const healthChildObj = {
    getAge : function() { // 자식 역할을 하는 메소드
        return this.age;
    }
}

Object.setPrototypeOf(healthChildObj, healthObj);
// healthChildObj 에 프로토타입 체인으로 healthObj가 들어간다.

const childObj = Object.setPrototypeOf({
    age : 22
}, healthChildObj); // healthChildObj가 들어간다.

//childObj.setHealth("11:55");
//childObj.showHealth();
// 프로토타입 체인으로 연결되어 부모요소의 값을 찾을 수 있다.

console.log(childObj); // 체인으로 부모요소까지 추가된다.
// {age:22, __proto__ : getAge, __proto__ : setHealth(newTime), showHealth}
```

