//map test1
const m1 = new Map([['a', 1], ['b', 2]]); // map 생성
console.log(m1); // Map(2) {"a" => 1, "b" => 2}

//map test2
const m2 = new Map(); // 빈 맵 추가
m2.set('a',1); // a가 key, 1이 value로 요소 추가
m2.set('b',2); // b가 key, 2가 value로 요소 추가

console.log(m2); // Map(2) {"a" => 1, "b" => 2}

//map test3
//Object는 String과 Symbol 타입만 키로 사용 가능하다.
//const obj1 = { a => a: 1 }; // Unexpected token =>
//const obj2 = { {}: 1 }; // Unexpected token {

//Map은 String과 Symbol 이외의 타입을 키로 사용 가능하다.
const m = new Map()
m.set(a => a , 1) // 키로 함수 사용
m.set({}, 2) // 키로 빈 객체 사용
m.set(false, true) // 키로 불린 사용
m.set('b', 2);

console.log(m); // Map(3) {f => 1, {...} => 2, false => true}

m.delete(a => a) // Map key삭제 a => a 가 있으므로 true (삭제)
m.clear() // 모든 요소를 제거하고 빈 Map으로 만든다.

m.get(a => a); // 함수, {}객체는 참조 타입이므로 undefined
m.get('b'); // 2

m.has('b'); // true
m.has(a => a); // false

m.size // 전체길이 반환

m.keys() // MapIterator {f, {...}, false, "b"}
m.values() // MapIterator {1, 2, true, 2}

