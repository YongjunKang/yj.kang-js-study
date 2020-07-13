## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### Template

##### Template 처리

템플릿 처리는 UI 개발에서 중요한 작업이다.

`JSON`으로 응답을 받고, `JavaScript Object`로 변환한 후에 어떠한 데이터처리 조작을 한 후,
`DOM`에 추가하는 작업은 UI 개발에서 빈번하고 어려운 일이다.

`데이터 + HTML문자열`의 결합이 필요하기 때문이다.

`Underscore` 와 같은 라이브러리를 많이 사용했다.
`ES6`의 `Template`은 일부 그 내용을 포함하고 있다.

```js
const data = [
    {
        name : 'coffee-bean',
        order : true,
        items : ['americano', 'milk', 'green-tea']
    },
    {
        name : 'starbucks',
        order : false,
    }
]

const template = `<div>welcome ${data[0].name} !!</div>`;
console.log(template);
// <div> welcome coffee-bean !!</div>
```

##### Tagged Template literals
템플릿을 조작하기 위해 `function` 에서 처리한 후 그 결과값을 반환하여 사용할 수 있다.

조건문, 반복문에서 다르게 처리할 필요가 있다.

```js
const data = [
    {
        name : 'coffee-bean',
        order : true,
        items : ['americano', 'milk', 'green-tea']
    },
    {
        name : 'starbucks',
        order : false,
    },
    {
        name : 'coffee-king',
        order : true,
        items : ['americano', 'latte']
    }
]

//Tagged template literals

function fn(tags, name, items) { // tags=배열, name=${data[1].name}, items=${data[1].items};
    console.log(tags);
    // ["<div>welcome", "!!<div>   <h2> 주문가능항목 </h2>, "</div>"]
    if(typeof items === "undefined") {
        items = "주문가능한 상품이 없습니다."
    }
    return (tags[0] + name + tags[1] + items + tags[2])
    // 결과값 반환
}

data.forEach((v) => {

let template = fn`<div>welcome ${v.name} !!</div>
    <h2> 주문가능항목 </h2><div>${v.items}</div>`;

console.log(template);
});
// <div>welcome starbucks !!</div>
//  <h2> 주문가능항목 </h2><div>undefined</div> ...
```

`<span style='color:red'>` 같은 처리도 해줄 수 있다.
`document.querySelector("#message").innerHTML += template;` 로 해당 위치에 추가하면 된다.



