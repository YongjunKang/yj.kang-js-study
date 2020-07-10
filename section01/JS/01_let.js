/* VAR SCOPE TEST*/
var varName = "global"; // 전역변수

function varHome() {
    var homeVar = "homeVar"; // 스코프체인에 따라 home()함수 안에 있는 var homeVar를 우선으로 한다.
    for(var i=0; i<10; i++) {
        console.log(i); // 0~0 출력
    }
    console.log(i);// 10 출력
}
varHome();

/* LET SCOPE TEST */
function letHome() {
    console.log(varName); // 전역변수 global 출력
    for(let i=0; i<10; i++) {
        console.log(i);
    }
    //console.log(i); // i is not defined 에러 표시(블록 스코프 밖)
}
letHome();

/* let 블록 스코프 테스트 */
if(true) {
    let test = 10;
    console.log(test); // 10
}
console.log(test); // i is not defined

/* let 전역변수 테스트 */
let globalTest = 10;

if(true) {
    globalTest = 20; // 10 => 20 으로 변경
    console.log(globalTest); // let globalTest 전역변수 이므로 값 20을 재할당 한다.
}
console.log(globalTest) // 재할당된 20 출력

/* 함수 서로의 스코프 접근 테스트 */
function firstScope() {
    let letScope = "Hello World!";
}

function secondScope() {
    firstScope();
    console.log(letScope); // Error, letScope is not defined
}

secondScope(); // 함수는 서로의 스코프에 접근할 수 없다.