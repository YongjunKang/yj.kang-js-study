var list = document.querySelectorAll("li");

/* var Closure
for (var i=0; i<list.length; i++) { // console.log(i)는 var i=0; 을 참조 하고 있다.
    list[i].addEventListener("click", function() { 
        console.log(i + "번째 입니다."); // i는 지역, 전역 변수가 아니다.
    });
} // console.log(i)는 var i=0 을 참조 하고 있기 때문에 마지막 값만 출력된다.
// => 5번째 입니다.
*/

for (let i=0; i<list.length; i++) {
    list[i].addEventListener("click", function() {
        console.log(i + "번째 li 입니다.");
        // 0번쨰 li입니다 ... 4번째 li입니다.
    });
}

function outter() {
    function inner() {
        var text = "Hello World!";
        console.log(text);
    }
    inner(); // 외부함수는 내부함수에 접근할 수 없다. (undefined)
}
outter(); // 내부함수는 내부함수에 접근할 수 있다. (Hello World!)