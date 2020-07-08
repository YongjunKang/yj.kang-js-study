## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

### ES2015 String에 새로운 메소드들

#### String

```js
let str = "hello world ! ^ ^ ~~";
```

`str`이 `hello`로 시작하는지 확인을 하기 위해 정규표현식을 사용할 수 있다.

```js
let str = "hello world ! ^ ^ ~~";
let matchstr = "hello";
```

`matchstr`의 길이에 해당하는 만큼 `str`의 문자열을 잘라서 
`substring` 메소드를 사용해 일치하는지 비교하는 방법도 있다.

###### substring() 메소드
string 객체의 시작 인덱스로 부터 종료 인덱스전 까지 문자열의 부분 문자열을 반환한다.
```js
const str = "hello";

console.log(str.substring(2, 5)); // llo가 출력된다 start=2 , length=5
```

#### startsWith() 메소드
`startsWith()` 메소드는 어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 `true` 혹은 `false`로 반환한다.

```js
let str = "hello world ! ^ ^ ~~";
let matchstr = "hello";
console.log(str.startsWith(matchstr)); // true
```

#### endsWith() 메소드
`endsWith()` 메소드는 어떤 문자열에서 특정 문자열로 끝나는지 확인하여 결과를 `true` 혹은 `false`로 반환한다.

```js
let str = "hello world ! ^ ^ ~~";
let matchstr = "^~~"; // "^ ~~" 는 true 반환
console.log(str.endsWith(matchstr)); // false 공백이 하나 없으므로 매칭이 안된다.
```

#### includes() 메소드
`includes()` 메소드는 하나의 문자열이 다른 문자열에 포함되어 있는지를 판별하고 결과를 `true` 혹은 `false`로 반환한다.

```js
let str = "hello world ! ^ ^ ~~";

console.log(str.includes("wo")); // "wo"가 포함되어 있으므로 true 반환
```

