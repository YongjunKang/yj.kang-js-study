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