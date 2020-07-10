const list = ["apple", "orange", "watermelon"];
list2 = [].concat(list);

console.log(list, list2);
// ["apple", "orange", "watermelon"] => list
// ["apple", "orange", "watermelon"] => list2

console.log(list === list2); // false

// concat() 메소드는 인자로 주어진 배열이나 값들을 기준 배열에 합쳐서 새 배열을 반환한다.
// 이렇게 만들어진 list와 list2는 전혀 다른 배열로 인식한다.