// spread operator
let pre = ["go", "javascript", 100];
let newData = [...pre]; // pre를 펼쳐서 보여준다. pre를 똑같이 쓰는거다.

console.log(pre); // (3) ["go", "javascript", 100];
console.log(newData); // (3) ["go", "javascript", 100];
console.log(pre === newData); // false

// spread operator HTML 
let li = document.querySelectorAll("li"); // html의 모든 li요소 받아오기
console.log(li); // NodeList(5) [li, li, li, li, li];

let newData = [...li];
console.log(newData); // NodeList를 liNew에 배열로 복사한다.
// (5)[li, li, li, li, li]

// 펼침 연산자를 사용하여 두 배열을 합쳐 새로운 배열을 만들 수 있다.
let arr = [1,2,3];
let arr2 = [4,5,6];

const newArray = [...arr, ...arr2];
console.log(newArray);