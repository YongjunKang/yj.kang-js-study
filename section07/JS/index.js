/*
document.querySelector("div").addEventListener("click", function({target}) {
    console.log(target.tagName); // target의 tagName을 출력
    console.log(target); // target을 출력
    console.log(target.innerHTML); // target의 innerHTML을 출력
})
*/

let test = document.querySelector("div");

test.addEventListener("click", clickE);

function clickE({target}) {
    console.log(target);
}

