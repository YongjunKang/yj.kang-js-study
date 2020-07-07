function constTest() {
    const text = "Hello World!"
    //text = "New World!"
    console.log(text); // Assignment to constant variable.
}
constTest(); // const는 재할당이 불가능 하므로 오류가 발생한다.


const Obj = {
    firstText : "Hello",
    lastText : "World!",
};

/*Obj = {
    firstText : "New",
    lastText : "World!",
};*/

console.log(Obj); // 객체도 재할당 할 수 없다.

const arr = ["1","2","3"];
//arr = ["4","5","6"];

console.log(arr); // 배열도 재할당 할 수 없다.

let arr2 = ["1","2","3"];
arr2 = ["4","5","6"];
console.log(arr2); // let은 재할당이 가능하다.

const list = ["apple", "orange", "watermelon"];
list.push("banana");
console.log(list); // 값을 재할당하는 것을 제외하고 정상적으로 처리된다.
//["apple","orange","watermelon","banana"]
list.pop() // 삭제도 정상적으로 처리된다.