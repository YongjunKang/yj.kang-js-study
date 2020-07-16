/* 프로퍼티 이름이 객체에 없을때, 기본값을 숫자 20으로 리턴받는다. */
const handler = {
    get: function(target, name) {
        return (name in target) ?
        target[name] :
        20;
    }
};

const proxy = new Proxy({}, handler);
proxy.a = 1;
proxy.b = undefined;

console.log(proxy.a, proxy.b); // 1 undefined
console.log('c' in proxy, proxy.c); // false 20


/* Proxy를 이용해 target으로 동작 전달 */
const target = {};
const proxy = new Proxy(target, {});

proxy.name = "Kang";

console.log(target.name); // Kang
console.log(target); // {name:"Kang"};
console.log(proxy); // Proxy {name:"Kang"}

/* Proxy를 활용한 검증방법 */
let validaton = {
    set: function(obj, prop, value) {
        if(prop === "age") {
            if(!Number.isInteger(value)) {
                throw new TypeError('age는 정수가 아닙니다.')
            }
        }
    } // object, propery, value
}

/* get 간단한 예제 */
const p = new Proxy({}, {
    get: function(target, property, receiver) {
        console.log(`called : ${property}`);
        return 10;
    }
});

console.log(p.test); // called : test, 10

/* set 간단한 예제 */
const p = new Proxy({}, {
    set: function(target, property, value, receiver) {
        console.log(`called : ${property} = ${value}`);
        return true;
    }
});

p.test = 10; // called : test = 10

