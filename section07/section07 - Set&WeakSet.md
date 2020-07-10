## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### Set 으로 유니크한 배열만들기

```js
let mySet = new Set();
console.log(toString.call(mySet)); // [object Set]
```

`Set`은 `new` 키워드로 클래스를 통해서 인스턴스를 만들듯이 사용해야한다.
+ 중복없이 ==유일한 값==을 저장하려고 할때 사용한다.
+ 이미 존재하는지 체크할 때 유용하다.

```js
let mySet = new Set();

mySet.add("Crong"); //Set()이 제공하는 메소드
mySet.add("hary");
mySet.add("Crong");

mySet.forEach(function(value) { // Loop를 돌면서 Iterator 한다.
    console.log(value) // Crong hary
});
```
+ iterator란 배열이나 유사한 자료 구조의 내부의 요소를 순회(traversing)하는 객체이다.

`"Crong"` `"hary"` `"Crong"` 3가지를 넣었지만 중복값을 제외하고 추가된다.
중복값을 넣는다고 해서 오류가 발생하지는 않는다.

```js
//if(mySet.had("Crogn")) {}
mySet.has("Crong"); // "Crong"이란 값이 있는지 확인. true
```

```js
mySet.delete("Crong"); // Crong을 삭제한다.
```
ES6에서는 이러한 자료구조를 클래스를 만들어 사용하는 경우가 있기에 기본으로 제공한다.

#### WeakSet 으로 효과적으로 객체 타입저장하기
`WeakSet()`은 참조를 가지고 있는 객체만 저장이 가능하다.

```js
let arr = [1,2,3,4];
let ws = new WeakSet();

ws.add(arr); // 배열 추가
ws.add(function(){}); // 참조를 가지고 있는 객체이기 때문에 function도 들어간다.

console.log(ws);
```
`ws.add(1111)` 숫자 혹은 `ws.add("aaaa")` 문자열, `null`등을 추가해보면 `Invalid value used in weak set` 유효하지 않은 값이라는 에러가 발생한다.

객체가 `null`로 되거나 필요가 없어지면 `WeakSet`의 가비지컬렉션이 되고 없어진다.
참조를 계속 모니터링하고 있다고 볼 수 있다.

```js
let arr = [1,2,3,4];
let arr2 = [5,6,7,8];
let obj = {arr, arr2};
let ws = new WeakSet();

ws.add(arr);
ws.add(arr2);
ws.add(obj);

arr = null; // null 값을 주고 실행을 하면 WeakSet에서는 존재 하는것처럼 보인다.

console.log(ws); // [5,6,7,8], [1,2,3,4], Object {arr, arr2};
console.log(ws.has(arr), ws.has(arr2)); // arr = false, arr2= true 확인을 하면 없다고 나온다.
```

+ 참조를 가지고 있는 객체만 저장이 가능하다.
+ 객체형태를 중복없이 저장하려고 할때 유용하다.

###### Set & WeakSet 추가정리

#### ==Set==
+ 중복이 허용되지 않으며 순서를 보장하는 값들로만 이루어진 리스트
+ 추가, 삭제, 초기화 요소의 총 개수, 포함 여부 확인
+ 객체를 저장할 경우 해당 객체에 대한 참조가 연결되어, 참조가 없어지더라도 set에는 객체가 여전히 살아있음.

##### [용도]
+ 중복 제거
+ 전체 순회할 필요성이 없는 경우
+ 값의 유무 판단

##### [사용하기 좋지 않은 경우]
+ 특정 요소에 접근
+ 인덱스가 필요한 경우

#### ==WeakSet==

+ 객체에 대한 참조카운터를 올리지 않아, 참조가 없어질 경우 WeakSet내의 객체는 garbage collection의 대상이 된다.

##### [Set과 다른점]
+ 참조형 데이터만 요소로 삼을 수 있음
+ iteralbe이 아니다.
    * keys(), values(), entries(), for ..of, size() 사용불가
+ has()는 가능하다.