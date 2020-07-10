## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### 섹션5 - 실습1 특정 문자열이 포함된 배열 만들어 반환하기

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>실습1</title>
</head>
<body>
    <ul>
        <li>apple</li>
        <li>orange</li>
        <li>banana</li>
        <li>strawberry</li>
    </ul>
</body>
</html>
```

```js
function print() {
    /*
    filter, includes, from을 사용해서 문자열 'e'가 포함된
    배열을 만들어서 반환하기
    */
}

print();
```

#### 설명
Nodelist를 받아와 `filter` `includes` `from` 를 사용해 노드로 구성된 배열을 만들어서 반환하기 => 문자열 'e'가 포함되었는지 확인

###### 정답

```js
function print() {
    let list = document.querySelectorAll("li");
    let listArray = Array.from(list)
    let eArray = listArray.filter(function(v) {
        return v.innerText.includes("e");
    });
    //return eArray;
    console.log(eArray); // [li, li, li]
    console.log(eArray.length); // 3
}
print()
```