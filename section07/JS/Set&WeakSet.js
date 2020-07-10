//set test1
const set = new Set();

set.add("a");
set.add(1);
set.add(5);
set.add(5);

console.log(set); // Set(3) {"a", 1, 5} // 중복값 5는 하나만 들어간다.

set.size; // 3
set.has(5); // true
set.delete(5); // set.size 2, Set(2) {"a", 1}
set.has(5); // false

// 배열과 다르게 인덱스 개념이 없고 값으로 삭제하고 포함 여부를 확인한다.

set.clear() // set.size 0

//set test2
const set = new Set([1,2,3,'1','2','3']) // 초기값 지정, 인자로 반복 가능한 개체를 지정할 수 있다.

const arrSpread = [...set]; // set을 배열로 전환한다.
const setSpread = new Set([...arrSpread]); // 펼친 배열을 다시 Set으로 만들 수 있다.

console.log(set.keys()) // SetIterator {1,2,3,'1','2','3'}
console.log(set.values()) //  SetIterator {1,2,3,'1','2','3'}
console.log(set.entries()) // 키/값 쌍을 가지는 새로운 객체를 반환
//{1 => 1, 2 => 2, 3 => 3, "1" => "1", "2" => "2", "3" => "3"}; 키와 값이 똑같다.

console.log(set[1]); // Set()은 인덱스가 없다.

//set test3
const arr = [1,1,2,2,3,3,4,4];
const newArr = [...new Set(arr)];

console.log(newArr); // [1, 2, 3, 4]
// 중복을 쉽게 제거할 수 있음.

//WeakSet test1
let obj1 = {a:1}; // 원본 참조
const set = new Set();
set.add(obj1); // obj1 객체에 대한 참조
obj1 = null // 원본 참조 삭제

console.log(set); // Set(1) {{...}} => 0 : value: {a: 1} 정상 출력된다.

//WeakSet test2
let obj2 = {a:1};
const weakSet = new WeakSet();
weakSet.add(obj2);

console.log(weakSet.has()); // true
obj2 = null;
console.log(weakSet.has()); // false



