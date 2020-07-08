/* # 문자열 정규식으로 비교 */
let str =" hello world!";
let exp = /hello/; // 정규식 리터럴

exp.test(str); //true
// .test 메소드는 유효성 검사에 사용된다 맞으면 true 틀리면 false를 반환한다.

/* # substring() 메소드 */
let substr = "hello javascript";
console.log(substr.substring(0, 5)); // hello
console.log(substr.substring(7, 8)); // a
console.log(substr.substring(6, 6)); // 공백도 위치로 친다.

/* # startWith(), endsWith() 메소드 */
let strWith = "hello world";
let endMatchStr = "world";
let startMatchStr = "hello";

console.log(strWith.startsWith(endMatchStr)); // strWith 시작에 world가 없으므로 flase
console.log(strWith.startsWith(startMatchStr)); // true
console.log(strWith.endsWith(endMatchStr)); // true

/* includes() 메소드 */
let str = "hello world ! hello javascript :)";

console.log(str.includes("hello")); // true
console.log(str.includes("java")); // true
console.log(str.includes(":)")); // true
console.log(str.includes("script:")); // false 공백도 포함해야 한다.

let arr = ["javascript", "go", "node"];

console.log(arr.includes("javascript")); // true 배열에 담긴 스트링 값도 확인할 수 있다.

