## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### Module

##### module(export & import)의 이해

자바스크립트에서 `import`, `export` 는 표준화되지 않은 실험적인 기능
자바스크립트 기반의 백엔드(node.js) 개발에서는 많은 파일들이 필요로 하고, 브라우저와 달리 `script src=""` 방법을 사용할 수 없다. 모듈을 서로 불러오고 수많은 클래스의 의존성 관계를 정리할 필요가 있다.

ES6에서 `import` `export` 에 대한 스펙을 제시했다.

자바스크립트 코드의 크기가 갈수록 커지고 기능도 복잡해지자 자바스크립트 커뮤니티에서 코드 전체를 기능 단위의 코드 뭉치로 분해하고 필요에 따라 결합할 수 있도록 하는 시스템을 도입한것이 `Module System`이다. 코드 뭉치 각각을 `Module` 이라고 한다.

----

##### 모듈을 내보낼 떄는 `export`, 가져올 때는 `import`를 활용한다.

```js
// export import

//log.js
export function test(data) { // 인자값을 받아와 콘솔로그로 찍어주는 함수를 내보낸다.
    console.log(data);
}

//app.js
import {log} from './log.js'; // log.js 를 모듈로 받아온다.
log("hello"); // 콘솔로그에 hello를 찍어준다.
```

```js
// export default

//log.js
export default function test(data) {
    console.log(data);
}

//app.js
import log from './log.js'; // default 이므로 {} 없이 사용해도 된다.
log("hello");
```

----

##### 순수 자바스크립트에서 에러 처리

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Module 적용</title>
    </head>
    <body>
        <script type="module" src="js/app.js"></script>
    </body>
</html>
```

`HTML`의 `script` 태그의 `type` 속성값을 `module`로 줘서 활용하면 된다.
type 속성을 명시하지 않으면

```
Uncaught SyntaxError: Cannot use import statement outside a module
```

위와 같은 에러가 발생한다.

----

#### module(export & import) 기반 서비스코드 구현방법

다중의 `export`도 가능하다.

```js
// log.js

export function log(data) { // log를 찍는 함수
    console.log(data);
}

export const getTime = () => { // 외부에서 사용하기 위해 export
    return Date.now();
}

export const getCurrentHour = () => {
    return (new Date).getHours();
}

//app.js

import {log, getTime, getCurrentHour} from './log.js';

log('hello');
log(getTime());
log(getCurrentHour());
```

----

```js
// utility.js
export default function log(data) { // data 인자값을 받아서 log를 찍는 함수를 내보낸다.
    console.log(data);
}

export const getTime = () => { // 외부에서 사용하기 위해 export
    return Date.now();
}

export const getCurrentHour = () => {
    return (new Date).getHours();
}

// class.js
export class MyLogger {
    constructor(props) {
        this.lectures = ['javascript', 'node'];
    }
    getLectures() {
        return this.lectures;
    }
}


// app.js
import log, {getTime, getCurrentHour} from './utility.js';
import {MyLogger} from './class.js';

log('my first test data') // myLogger의 log 함수를 불러와서 사용한다.
log(`getTime is ${getTime()}`);
log(`current hour is ${getCurrentHour()}`);

const ml = new MyLogger();
log(`lectures : ${ml.getLectures()}`);

_.log("new hello");
```

----

```js
export default const test = {
    //...
}
```
`export default` 키워드로 지정된 단일 변수, 함수 또는 클래스 이며 Module당 하나의 Default 만 설정할 수 있다. `default` 키워드를 다중으로 사용하는 것은 구문 오류이다.

`export default` 뒤에 `const`와 `let`을 함께 사용할 수 없다.
그러므로,

```js
const test = {
    //...
}

export default test;
```
따로 써주면 객체리터럴을 반환해서 사용할 수 있다.

###### Module 추가정리
1. Module의 최상위 레벨에있는 `this`의 값는 `undefined`이다.
2. Module의 최상위 레벨에서 작성된 변수는 공유된 전역 범위에 자동으로 추가되지 않는다. => Module의 최상위 범위에만 존재한다.
3. Module은 코드 내에서 HTML 스타일의 주석을 허용하지 않는다.
4. Module 외부에서 사용할 수 있어야하는 모든 것을 export 해야한다.
5. Module은 다른 Module에서 바인딩을 가져올 수 있다.

```js
// import 방식

// 단일 바인딩 import
import { sum } from "./example.js";
console.log(sum(1, 2));

// 여러 바인딩 import
import { sum, multiply, magicNumber } from "./example.js";
console.log(sum(1, magicNumber));
console.log(multiply(1, 2));

// Module에서 모두 import
import * as example from "./example.js";
console.log(example.sum(1,2));
console.log(example.multiply(1, 2));

export { sum as add }; // 외부로 알려진 이름을 add로 변경한다.
import { sum as add }; // 받아온 sum의 이름을 add로 변경한다.
```