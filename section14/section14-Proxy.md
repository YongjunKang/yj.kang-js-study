## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### Proxy

##### Proxy로 interception 기능 구현

`Porxy`는 어떤 오브젝트가 있을 때 그 오브젝트를 가로채서 다른 작업을 추가로 할 수 있는 일을 제공한다.

오브젝트가 변경, 추가, 삭제, 오브젝트의 값을 얻을 때 부수적인 일을 그 사이에 넣을 수 있다.

```js
const myObj = { name:"Kang" };
const proxy = new Proxy(myOjb, {}); // {} 커스텀한 기능을 넣고 싶을때 {} 자리에 넣으면 된다.

proxy.name // Kang [myObj를 래핑해주는것과 같다.]
toString.call(proxy); // [object Object];
proxy;
myObj; // {name:"Kang"};

proxy === myObj // false
proxy.name === myObj.name // true
```

`myObj`에 있는 데이터의 값을 변경하거나 프로퍼티들을 얻으려고 했을 때 (`set`,`get`)

```js
// set
const myObj = {name:"Kang"}
const proxy = new Proxy(myObj, {
    get : function() {
        
    },
    set : function() {
        console.log('change value');
    }
});

proxy.name = "Kim";
// change value
// "Kim"
```

```js
// get
const myObj = {name:"Kang"}
const proxy = new Proxy(myObj, {
    get : function(target, property, receiver) { // receiver는 Proxy 개체 자체를 뜻한다.
        console.log('get value');
        return target[property];
    },
    set : function(target, property, value) { 
        console.log('set value');
        target[property] = value; //target = myObj, property를 value로 지정한다.
    }
});

proxy.name;
//get value
//Kang

proxy.name = "Kim";
//set value
//Kim

proxy.name;
//get value
//KIM
```

객체의 변화를 중간에 가로채서 `set`, `get`을 해줄 수 있다.

```js
// 변화 확인하기
const myObj = {name:"Kang", changeValue : 0}; // 변화값
const proxy = new Proxy(myObj, {
    get : function(target, property, receiver) { // receiver는 Proxy 개체 자체를 뜻한다.
        console.log('get value');
        return target[property];
    },
    set : function(target, property, value) { 
        console.log('set value');
        target['changedValue'] ++; // 변화값이 증가함
        target[property] = value; //target = myObj, property를 value로 지정한다.
    }
});

// 변화마다 changeValue 값이 증가한다.
proxy.name = "Kim"; // set value
proxy.changedValue; // 1
```

`myObj.name = "Kim"` 을 해줬을 때 `Proxy`의 `get`, `set`을 사용하지 않았기 때문에 값은 변경되더라도 변화 값은 증가하지 않는다.

`myObj` 값을 `proxy`에 넣어주면 `proxy`를 통해서만 접근할 수 있다. (값을 숨길 수 있음)

`form`에 들어가는 인풋 데이터를 `proxy`에 적어주고 `set`을 호출해 주면서 변화를 모니터링하면서 인풋 값을 이용해 다른 쪽에 변화를 줄 수도 있다.

`return Reflect.get(target.property) // Reflect는 오브젝트 안에 프로퍼티 값을 뽑아주는 역할`
위 코드를 실행하면 target의 property 값을 얻을 수 있고 그 결과를 리턴해준다.

```js
// default value 값 지정하기
const proxy = new Proxy({name:"Kang", changeValue : 0}, {
    get : function(target, property, receiver) { 
        return (property in target) ? target[property] : "anonymous";
        // 프로퍼티 값이 타겟에 있을때는 타겟의 프로퍼티 값을 반환하고 없으면 anoymous를 반환한다.
    },
    set : function(target, property, value) { 
        console.log('set value');
        target['changedValue'] ++; // 변화값이 증가함
        target[property] = value; //target = myObj, property를 value로 지정한다.
    }
});

proxy.name; // "Kang"
proxy.test; // "anonymous"
```

###### Proxy 추가정리
`Proxy`객체는 자바스크립트에서의 기본 작업, 예를들면 속성 조회, 할당, 열거, 함수 호출등에 대한 행위에 대해 ==사용자의 커스텀 동작을 정의할 때 사용== 할 수 있다.

```js
// 기본 사용방법
var proxy = new Proxy(target, handler);
```
1. 타겟(target) : 프록시로 감쌀 대상 객체(랩핑)
2. 핸들러(handler) : 트랩 메소드들을 담고 있는 객체, 타켓에 대한 동작을 감지하여 그에 대응하는 트랩 메소드가 존재할 경우 해당 트랩 메소드를 호출한다.
3. 트랩(trap) : 핸들러 안에 존재하는 메소드, 타겟 객체에 대한 동작을 가로채며, 사용자 정의 로직을 넣을 수 있다.

`target` 에는 `Proxy`로 랩핑할 대상 객체를 지정해 줄 수 있다.
기본 배열, 함수, 또다른 Proxy 객체 등이 들어갈 수 있다.

`handler`에는 `operation`이 수행 될 때, `Proxy`의 동작을 정의하는 함수 객체를 넣어준다. (operation = 조회, 할당, 열거, 호출 등)

`handler`에는 `get`, `set`, `defineProperty`, `deletePropery`, `construct`, `apply` 등의 함수를 핸들링 할 수 있다.

1. `proxy.test =`를 이용해 값을 쓰면 `target`에 새로운 값이 설정된다.
2. `proxy.test`를 이용해 값을 읽으면 `target`에서 값을 읽어온다.
3. `proxy`를 대상으로 반복 작업을 하면 `target`에 저장된 값이 반환된다.

##### `get`
`target` - 동작을 전달할 객체 `new Proxy`의 첫 번째 인자.
`property` - 프로퍼티 이름
`receiver` - 타겟 프로퍼티가 getter라면 `receiver`는 getter가 호출 될때 `this`이다.

##### `set`
`target` - 동작을 전달할 객체로 `new Proxy`의 첫 번째 인자.
`property` - 프로퍼티 이름
`value` - 프로퍼티 값
`receiver` - `get` 트랩과 유사하게 동작하는 객체, setter 프로퍼티에만 관여한다.

##### `Reflect`
`Reflect.get()` 정적 메소드는 객체의 속성을 가져오는 함수이다.
=> target[property]와 비슷하다.
```js
Reflect.get(target, property[, receiver]);
```

`Reflect.set()` 정적 메소드는 객체 속성의 값을 설정한다.
```js
Reflect.set(target, property, value[, receiver])
```

ES6에서 추가된 객체이다.
```js
handler.trap(target, arg_1, ..., arg_n)
// 위와 같은 모든 trap 메소드에 대응한다.
Reflect.trap(target, arg_1, ..., arg_n)
```

