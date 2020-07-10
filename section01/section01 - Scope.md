## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### 섹션1 - Scope

##### 1. let
```js
// var를 사용한 예시

var name = "global var"; // 전역변수

function home() {
    var homeVar = "homeVar"; // 지역변수
    for(var i=0; i<100; i++) {
        console.log(i); // 1~100
    }
}

home();
```

위 코드의 `var name` 전역변수가 `home()`함수에 접근이 가능하지만 `home()`함수 안에 있는 `var homeVar` 지역변수가 우선이다.

ES6 전까지의 함수 단위의 스코프(function scope) 위주였다.

함수 안에 지역변수를 먼저 잡고 지역변수가 없다면 전역 변수로 스코프체인을 따라 올라가서 `main` 값을 잡는다.

```js
// let을 사용한 예시

var name = "global var" // 전역변수

function home() {
    var homevar = "homevar"; // 지역변수
    for(let i=0; i<100; i++) {
        console.log(i) // 정상 출력
    }
    console.log(i) // i is not defined. 에러 발생
}

home();
```

`let`은 블록 스코프 이므로 for문 밖에서는 접근이 불가능 하지만 for문의 `({})중괄호` 안에서는 유효한 값을 출력한다.


##### let과 Closure
Closure 스코프가 생기면서 예상치 못한 동작들이 조금 생길 수 있다.

아래 코드를 예로,
```html
<!-- Closure 예제 -->

<!--HTML-->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" ...>
    <title>Closure</title>
</head>
<body>
<ul>
    <li>javascript</li>
    <li>java</li>
    <li>python</li>
    <li>django</li>
</ul>
</body>
</html>
```
```js
//JAVASCRIPT
var list = document.querySelectorAll("li");

for (var i=0; i<list.length; i++) {
    list[i].addEventListener("click", function() { 
    console.log(i + "번째 리스트 입니다.");
    });
}
```

`for문` 안에 list 는 nodeList타입이며 순회 하면서 li 태그에 이벤트리스터를 등록한다.

li 태그를 클릭하면 해당 위치가 몇 번째 리스트 인지를 알려준다.

어느곳을 눌러도 4번째 리스트로 고정되어 출력된다.

이벤트리스터 `function() ...` 콜백은 원래 나중에 실행 되야하는데 그때마다 `function()`이 가지고 있는 `console.log(i...)` 값은 지역, 전역 변수도 아니므로 콜백 밖에 있는 `for(var i=0) ...`의 i 값(전역공간)을 참조 하면서 변수를 기억하고 있다.

`function()`의 i 값을 Closure 변수 라고 할 수 있다.
-> `function()`이 가지고 있지 않은 지역변수

전역공간의 i 값이 계속 변경되면서 4개가 존재하는 이벤트핸들러가 전역공간의 i 값을 참조, 공유하면서 생기는 문제다.

###### 해결하는 방법
1. `for문`안에 `function()`을 만들어 지역변수화 시켜서 해결하는 방법.

2. `for(var i=0 ...)`의 `var`를 `let`으로 변경하는 방법으로 간단하게 해결 할 수 있다.

###### 크롬 개발자 도구의 디버거 창에서 Scope 영역을 확인할 수 있다.

지역변수화 시킨것과 비슷한 개념이다.
블록이 가지고있는 특정 변수를 기억했다가 그것을 참조한다.

#### const - 선언된 변수 지키기
```js
// var 사용시

function home() {
    var homeName = 'my house';
    homeName = 'your house';

    console.log(homeName); // your house

    home();
}
```

`homeName = 'your house`를 통해 재할당된 `var homeName`이 출력된다.

하지만 변경이 필요없는 값이라면 아래쪽에서 수정이 이루어지면서 의도치 않게 `homeName`이 변경된다.

예전은 표준적인 방법은 아니지만 `HOME_NAME` 대문자 표기법을 이용하여 "상수니까 건들거나 수정하면 안된다." 라고 네이밍 컨벤션을 통해서 표시했다.

```js
// const 사용시

function home() {
    const homeName = 'my house';
    homeName = 'your house';

    console.log(homeName); 

    home(); // Assignment to constant variable (재할당 오류 발생)
}
```

`const homename = [1,2,3,4];` `homeName=["1","2"]` 배열로 테스트를 해도 타입과 상관없이 const를 사용시에는 재할당 오류가 뜬다. 

`var`, `let`, `const` 를 모두 사용하여 혼동을 일으키는것 보다는 `const`를 기본으로 사용하고 변경이 필요한 변수는 `let`을 사용한다. `var`는 사용하지 않는 것이 좋은 전략이라 생각한다.

`let`은 블록 스코프를 떠나서 전역 선언을 하면 `var`를 대체할 수 있다.

#### const특성과 immutable array
핵심 : const = 한번 선언된 변수 값을 재할당 할 수 없다.
`const` 역시 블록 스코프이다.

```js
function home() {
    const list = ["apple", "orange", "watermelon"];
    //list = "test" // 재할당 오류 발생
    list.push("banana"); // 정상적으로 추가된다.
    console.log(list);
}
```

`const`를 사용하더라도 배열과 오브젝트의 값을 변경하는 것은 가능하다.
즉, `const`는 불변을 의미하는게 아니라 값 재할당만 불가능하다.

###### 요약정리
`let` = 재할당 가능
`const` = 재선언, 재할당 모두 불가능

#### immutable array

###### immutable(변경불가성)
객체가 생성된 이후 그 상태를 변경할 수 없는 디자인패턴을 의미한다.

변경불가성이 필요한 이유는 객체는 참조 형태로 전달하고 전달 받는데 객체가 참조를 통해 공유되어 있다면 그 상태가 언제든지 변경될 수 있기 때문에 문제가 될 가능성도 커지게 된다.

예를 들어 에디터로 글을 쓸때 임시저장을 하면서 작업을 뒤로가기, 앞으로가기 버튼을 눌러 어떤 값을 되돌리고 싶다.

그때그때 저장해둔 값을 가지고 보여주고 싶은데 `array`는 참조가 계속 바뀌니까 copy가 되는게 아니라 하나의 값이 계속 바뀌기 때문에 이전에 어떤 데이터였는지 기억을 할 수 없다.

```js
const list = ["apple", "orange", "watermelon"];
list2 = [].concat(list, "banana");

console.log(list, list2);

["apple", "orange", "watermelon"] // list
["apple", "orange", "watermelon", "banana"] // list2

console.log(list === list2); // 자료형과 값 모두 false
```

###### concat() 메소드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환한다.
+ 기존배열을 변경하지 않는다.
+ 추가된 새로운 배열을 반환한다.

list3를 만들어도 기존의 list, list2와 전혀 같지 않은 새로운 array를 생성한다.

이런 경우 list를 그대로 보관하고 있고, 조작이 가능한 array가 아닌 수정이 가능한 array 즉 불변의 array가 필요할때가 있다.

1. `react`에서는 `state`값이 바뀔때 마다 `reduce`를 사용하여 `redux`해서 새로운 객체를 계속 만들어 상태값을 바꿔서 반환한다.

2. `immutable.js` 라이브러리를 사용해서 객체 원본을 그대로 두고, 복사본을 만드는 여러방법을 제공 받을 수 있다.

3. ES6 에서는 `replace()`와 같은 메소드를 지원한다.

###### 스터디 이후
- 강의에서 생략된 Closure 개념 공부
- immutable array에 대해서 알아두기