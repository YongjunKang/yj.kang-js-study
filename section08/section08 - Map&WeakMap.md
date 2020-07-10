## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### Map & WeakMap 추가정보를 담은 객체저장하기
Array -> Set, WeakSet
Object -> Map, WeakMap

`map()`은 key, value 구조이다.
어떤 객체만 저장하는게 아닌 객체의 추가적인 정보를 같이 보관할때 유용할 수 있다.
key 값에 객체를 저장한다.

```js
//WeakMap

let wm = new WeakMap();
let myfun = function() {};
//myfun 함수가 얼마나 실행 됐는지 확인

wm.set(myfun,0);
console.log(wm); // WeakMap {f => 0}

for(let i=0; i<10; i++) { // 10번 불러온다.
    count = wm.get(myfun); // get value
    count++; // 뽑은 상태에서 카운트 값을 늘린다.
    wm.set(myfun, count);
}

console.log(wm); // { f => 10 };
// 키 값에 따라서 value값을 뽑아온다.

console.log(wm.get(myfun)) // { f => 10 };

myfun = null;;
console.log(wm.get(myfun)) // 초기화 이후에는 undefined가 뜬다.
console.log(wm.has(myfun)); // false
```

오브젝트 타입을 중복없이 사용하려고 할때 유용하게 쓸 수 있다.

#### WeakMap 클래스 인스턴스 변수 보호하기

```js
//WeakMap 활용

// prototype 기반의 클래스 생성
function Area(height,width) {
    this.height = height;
    this.width = width;
}

Area.prototype.getArea = function(){
    return this.height + this.width;
}

let myarea = new Area(10,20);
console.log(myarea.getArea()); // 200
console.log(myarea.height); // 값을 바로 뽑아온다. 10
```

`console.log(myarea.height)`에서 값을 바로 뽑아오는걸 숨기고 싶을때,
전역공간에 보관을 하고 빌려 사용하는 방법도 있지만 효율적인 방법을 위해 `WeakMap()`을 사용해서 인스턴스 관리를 할 수 있다.

객체가 필요 없어지면 가비지컬렉션이 되므로 자료를 보관하는 상태를 가볍게 해줄 수 있다.

```js
const wm = new WeakMap();

function Area(height, width) {
    wm.set(this, {height, width}); // this 키워드를 넣어주고 현재의 객체에 대한 2가지 값을 넣어준다.
}

Area.prototype.getArea = function() {
    const {height, width} = wm.get(this);
    return this.height * this.width;
}

let myarea = new Area(10,20);
console.log(myarea.getArea()); // 200
console.log(myarea.height); // 외부에서 접근을 할 수 없으므로 undefined가 뜬다.

myarea = null;
console.log(wm); // {Area{} => Object {height: 10, width: 20}} 이 그래도 보인다.
console.log(wm.has(myarea)); // myarea가 없기에 false 가 뜬다.
```

클래스 인스턴스, 클래스 에서 생성한 `myarea`에서는 width, height를 쓸 수 없다.
private 변수를 클래스에서 만들어 사용할때 외부에 전역공간을 옮길 수 있는데 그럴때  `WakeMap`을 사용하면 효율적이다.

```js
const obj = {};

function Area(height,width) {
    obj.height = height;
    obj.width = width;
}

Area.prototype.getArea = function() {
    return obj.height * obj.width;
}

let myarea = new Area(10,20);

console.log(obj);

myarea = null;

console.log(obj); // 가비지컬렉션이 되지 않은 상태이다.
// 위 코드와의 차이점
```

###### Map & WeakMap 요약 정리
==Map==
+ 다양한 타입으로 `key`를 정의할 수 있다.
+ 이터러블 오브젝트(iterable object)이다.
+ 중복된 `key`를 추가할 수 없다.
+ 중복된 `key`를 통해 추가하는 경우 해당 `key`의 `value`를 덮어쓴다.
    * 즉 기존 `key`의 순서를 유지한다.
+ 순서를 보장하는 자료구조이다.

==WeakMap==
+ `WeakMap` 오브젝트의 `key`에는 Object만 지정될 수 있다.
+ `key`로 사용하고 있던 Object 오브젝트가 메모리에서 사라질 경우, Garbage Colleting이 되면 더이상 `value`의 `key`로서 역할을 수행하지 못한다. 그렇기 때문에 `key`에 대한 내용을 삭제해줘야 한다.
+ `WeakMap`을 사용하면 메모리에서 사라진 `key`에 대해서 삭제하는 작업이 자동으로 해결된다.
+ `set()`, `get()`, `has()`, `delete()` 4가지 API만 제공한다.
+ `size` 프로퍼티가 존재하지 않기 때문에 특정 시험의 `[key,vlaue]`의 수를 알 수 없다.


