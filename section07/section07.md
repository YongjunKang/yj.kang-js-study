## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

### 섹션7

#### Destructuring
구조 분해 할당 구문은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 자바스크립트의 표현식이다.
-> 구조화된 배열 또는 객체를 비구조화 하여 개별적인 변수에 할당하는 것.
배열 또는 객체 리터럴에서 필요한 값만을 추출하여 변수에 할당하거나 반환할 때 유용하다.

```js
// Destructuring
let a, b, rest;
[a, b] = [10, 20];

console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50] 배열의 나머지를 할당
```

##### Destructuring Array 배열 구조 분해

```js
//Destructuring Array
// ES5
let data = ["Kang", "Lee", "Kim"]; // data에 배열이 있고,
let name = data[0]; // 각각 0번째 값과
let name2 = data[2]; // 2번째 값을 가리킨다.
```
특정 인덱스의 값이 의미가 있을때 이 방법을 사용할 수 있고,

```js
// ES6
let data = ["Kang", "Lee", "Kim"];
let [name,,name2] = data; // data의 해당 값을 나타낸다 위의 0, 2
console.log(name, name2);
```
Destructuring을 사용하면 변수에 배열이나 오브젝트에 필요한 값을 할당하는데 유용하게 사용할 수 있다.

##### Destructuring Object 객체 구조 분해
```js
let obj = {
    name : "Kang",
    address : "korea",
    age : 26
}

let {name, age} = obj // name 과 age의 프로퍼티이름(key)을 기준으로 값을 뽑아온다.
console.log(name, age); // Kang, 26

let {name:myName, age:myAge} = obj; // 다른이름으로 저장해서 새로운 값으로 출력해줄 수 있다.
console.log(myName, myAge); // Kang, 26
```
필요한 오브젝트의 `key`값 배열에서는 []를 사용하여 인덱스를 뽑아낼 수 있다.

##### Destructuring 활용 JSON파싱

```js
// 예시 JSON 형태의 news 데이터
let news = [ // news 데이터 배열
    { // 오브젝트
        "title" : "sbs", // key와 value로 구성된 뉴스 정보
        "imgurl" : "http://static.naver.net/newsstand/2017/0313/article_img/9054/173200/001.jpg",
        "newslist" : [
            "[가보니] 가상 경주도 즐기고, 내 손으로 자동차도 만들고",
            "리캡차'가 사라진다"
            "갤럭시S8' 출시? '갤노트7' 처리 계획부터 밝혀야",
            "블로코-삼성SDS, 블록체인 사업 '맞손",
            "[블록체인 돌아보기] 퍼블릭 블록체인의 한계와 프라이빗 블록쳬인"
        ]
    },
    {
        "title" : "mbc",
        "imgurl" : "http://static.naver.net/newsstand/2017/0313/article_img/9033/220451/001.jpg",
        "newslist" : [
            "Lorem ipsum dolor sit amet",
            "consectetur adipiscing elit",
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        ]
    }
];

let [,mbc] = news; // news데이터에서 mbc에 대한 정보를 뽑아온다.
console.log(mbc); // mbc 오브젝트에 대한 정보가 출력된다.

let {title, imgurl} = mbc;
console.log(title, imgurl);
```

서버에서 ajax를 통해서 JSON을 받았을때, 그 데이터에 대한 파싱을 `Destructuring`을 활용해보겠다.
`let [,mbc] = news`는 news 데이터에서 mbc에 대한 정보를 가져온다. `let {title, imgurl} = mbc` `mbc`에서 `title`과 `imgurl`을 뽑아온다.
파싱을 할때 `news`의 몇번째 인덱스를 하는 방법도 있지만 Destructuring을 활용해서 필요한 변수값을 뽑는것도 가능하다.

``` js
let [, {title, imgurl}] = news; // 위의 값을 한번에 뽑는방법
console.log(imgurl); // 위의 let {title, imgurl} = mbc와 동일한 방법
```

##### Destructuring 활용 Event 객체 전달

`Destructuring`을 `function()` 에 활용해도 동일하게 사용할 수 있다.

```js
let news = [ // news 데이터 배열
    { // 오브젝트
        "title" : "sbs", // key와 value로 구성된 뉴스 정보
        "imgurl" : "http://static.naver.net/newsstand/2017/0313/article_img/9054/173200/001.jpg",
        "newslist" : [
            "[가보니] 가상 경주도 즐기고, 내 손으로 자동차도 만들고",
            "리캡차'가 사라진다"
            "갤럭시S8' 출시? '갤노트7' 처리 계획부터 밝혀야",
            "블로코-삼성SDS, 블록체인 사업 '맞손",
            "[블록체인 돌아보기] 퍼블릭 블록체인의 한계와 프라이빗 블록쳬인"
        ]
    },
    {
        "title" : "mbc",
        "imgurl" : "http://static.naver.net/newsstand/2017/0313/article_img/9033/220451/001.jpg",
        "newslist" : [
            "Lorem ipsum dolor sit amet",
            "consectetur adipiscing elit",
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        ]
    }
];

function getNewsList([,{newslist}]) { // 2번째 mbc에서 newslist를 뽑아온다. [{newslist}] = 첫번째 뉴스의 newslist를 가져온다.
    console.log(newslist)
}

getNewsList(news); // news 데이터를 getNewsList로 전달
```

`function()`의 파라미터를 활용해서  `Destructuring`을 사용하면 필요한 값을 쉽게 파싱할 수 있다.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>TEST</title>
</head>
<body>
    <div>
        Lorem Ipsum dolor sit amet, consectetur adipisicing elit. Expedita repellendus incidunt, aspernatur molestiae at, earum tempore amet soluta quasi delectus quibusdam dolores, modi illo qui sed quo quis pererendis minus.
    </div>
</body>
</html>
```

```js
document.querySelector("div").addEventListener("click", function(evt) { 
    console.log(evt.target); //클릭시 해당 div태그의 evt의 오브젝트를 가져온다.
});
```

더 간단하게 하는 방법도 있다.

```js
document.querySelector("div").addEventListener("click", function({target}) { // 이벤트 객체를 다 넘겨주는게 아니라 target만 넘겨준다.
    console.log(target.tagName); //클릭시 해당 tagName Div만 출력한다.
    //({type})은 타입만 받아온다.
});
```

무거운 이벤트 객체를 모두 전달받은 뒤, 필요한 값을 뽑아쓰는 작업을 필요한 값만 받아서 간소화시킬 수 있다.