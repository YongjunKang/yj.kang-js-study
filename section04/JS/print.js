
const li = document.querySelectorAll("li"); // NodeList(4)

function print() {

    let newArray = Array.from(li); // NodeList를 배열로 변경한다.
    let newData = newArray.filter(function(value){ // value는 노드다.
        //return value.includes('e');
        return value.innerText.includes('e'); // newArray는 노드로 구성된 배열
    });
    console.log(newData); // [li, li, li] = apple, orange, strawberry
}

print();