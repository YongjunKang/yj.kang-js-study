## 모던 자바스크립트(javascript) 개발을 위한 ES6 강의

#### 미니 프로젝트

##### step.0 미니 프로젝트 소개

> 1. 블로그 버튼을 누르면 블로그 정보를 AJAX로 받아와서 네모난 박스형태로 보여준다.
> 2. 네모 박스안에 제목은 앵커테이블을 통해 링크를 연결해준다.
> 3. 네모 박스안에 찜하기 버튼을 누르면 하단의 내 찜 목록에 추가된다.
> 4. 찜하기 버튼을 클릭하면 찜취소 버튼으로 변경된다. (찜하기 <=> 찜취소)

##### step.1 nodeJS 기반 환경구성과 webpack
1. 프로젝트 폴더에 `npm init` 명령어를 통해 `package.json`을 생성한다.
2. `sudo npm install webpack --save-dev` 명령어를 통해 `webpack`을 설치한다.
> --save : package.json에 필요한 의존성 파일을 추가한다. 
> -dev : 개발모드.
3. `package.json` `"scripts" :` 에 `"start" : "webpack"`을 추가한다.
4. `npm run start` 를 통해 `webpack`을 실행한다.
5. `webpack.config.js`에 아래 명령어를 추가한다.
```js
let path = require('path'); // path가 기본적으로 필요하다.

module.exports = { // 모듈을 exports 해준다.
    entry: './src/index.js', // node 시작점 (어떤 코드를 기준으로 분석하는지를 정한다.)
    output : { // 분석한 내용 결과 파일생성
        filename: 'bundle.js',
        path:path.resolve(__dirname, 'dist')
    },
    moduel: {
		rules : [{
		}]
    }
}
```

----

### WebPack

###### WebPack 설치
```
npm i -D webpack-dev-server
```

##### entry(엔트리)
  웹팩에서 모든 것은 모듈이다. 자바스크립트, 스타일시트, 이미지 등 모든 것을 자바스크립트 모듈로 로딩해서 사용하도록 한다.

  자바스크립트가 로딩하는 모듈이 많아질수록 모듈간의 의존성은 증가한다.
  의존성 그래프의 시작점을 웹팩에서는 엔트리(entry)라고 한다.

###### webpack.config.js 
  ```js
moduel.exports = {
  entry: {
    main : './src/main.js',
  }
}
  ```

html에서 사용할 자바스크립트의 시작점은 src/main.js 코드이다.
entry 키에 시작점 경로를 지정했다.

----

##### output(아웃풋)
엔트리에 설정한 자바스크립트 파일을 시작으로 의존되어 있는 모든 모듈을 하나로 묶을 것이다.
번들된 결과물을 처리할 위치는 output에 기록한다.

###### webpack.config.js 
  ```js
moduel.exports = {
  entry: {
    main : './src/main.js',
  }
  output: {
    filename: 'bundle.js',
    path: './dist'
  }
}
  ```
dist 폴더의 bundle.js 파일로 결과를 저장할 것이다.
html파일에서는 번들링된 이 파일을 로딩하게끔 한다.

###### index.html
```html
<body>
  <script src="./dist/bundle.js"></script>
</body>
```
엔트리에 설정한 자바스크립트는 Utils.js 모듈을 사용한다.

###### src/main.js
```js
import Utils from './Utils'
Utils.log('hello webpack')
```

###### src/Utils.js
```js
export default class Utils {
  static log(msg) { console.log('[LOG] ' + msg)}
}
```

웹팩은 터미널에서 webpack 커맨드로 빌드할 수 있다.
```
webpack
```

----

##### Loder(로더)
웹팩은 모든 파일을 모듈로 관리한다.
이는 자바스크립트 뿐만 아니라 이미지, 폰트, 스타일시트도 전부 모듈로 관리한다.
웹팩은 자바스크립트만 읽을 수 있으므로 다른 파일을 웹팩이 이해하게끔 변경해야한다.
이때 로더가 그런 역할을 한다.

로더는 `test`와 `use`키로 구성된 객체로 설정할 수 있다.
+ test에 로딩할 파일을 지정하고
+ use에 적용할 로더를 설정한다.

###### babel-loader
바벨은 ES6의 코드를 ES5로 변환할 때 사용할 수 있다.

###### webpack.config.js
```js
module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: 'node_modules', // 패키지 폴더이므로 제외하기 위해 exclude에 설정한다.
      use: {
        loader: 'babel-loader', // babel-loader를 추가했다.
        options: {
          presets: ['env']
        }
      }
    }]
  }
}
```
로더를 사용하기 위해서는 노드 패키지로 제공하는 로더를 npm으로 추가해야한다.
```
npm i --save--dev babel-loader bable-core babel-preset-env
```
빌드 혹은 npm run start 명령어로 실행하고 나면 bundle.js가 ES5 문법으로 변경된것을 확인할 수 있다.

###### css-loader, style-loader
웹팩은 모든 것을 모듈로 다루기 때문에 CSS 파일을 자바스크립트로 변환해서 로딩해야한다.

###### dist/bundle.js
```js
//module
exports.path([module.i, "body {\n background-color: green;\n}\n", ""]);
```

모듈로 변경된 스타일 시트는 돔에 추가되어야만 브라우저가 해석할 수 있다.
###### webpack.config.js
```js
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
}
```

###### src/style.css
```css
body {
  background-color: green;
}
```

----

##### Plugin(플러그인)
로더가 파일단위로 처리한다면 플러그인은 번들된 결과물을 처리한다.
번들된 자바스크립트를 난독화 한다거나 특정 텍스트를 추출하는 용도로 사용할 수 있다.

###### UglifyJsPlugin
로더로 처리된 자바스크립트 결과물을 난독화 처리하는 플러그인이다.

###### webpack.config.js
```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
}
```

----

##### step.2 babel preset 설정

###### babel-preset-env 설치
```
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

###### setting
```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

##### step.3 webpack-dev-server와 html 구성
```
sudo npm install --save-dev webpack-dev-server
```

###### package.json
```json
"scripts": {
  "build": "webpack",
  "devserver": "webpack-dev-server --inline" // wepack-dev-server github 참고
},
```

###### webpack.config.js
```js
module.exports = {
	entry: './src/index.js',
	output : {
		filename: 'bundle.js',
		path:path.resolve(__dirname, 'dist'),
		publicPath: '/dist' // publicPath 추가
  },
}
```

dev-server 같은 경우에 publicPath를 중요시 여긴다.
로더들이 사용할 파일을 불러올 경로를 지정해 주는것이다.
`dist`의 항목을 실제로 업데이트 하지않고 잠깐 메모리공간에 서버가 가지고 있다가
임시 번들을 만들어서 화면에 보여주게 된다.

###### 시작
```
npm run devserver
```

----

##### step.4-1 XHR통신
```js
const oReq = new new XMLHttpRequest();
```
를 이용한 방식으로 데이터를 받아오고 보낸다.


###### index.js
```js
import blog from './main.js';

const myBlog = new blog();
```

###### main.js
```js
class Blog {
    constructor() { // 초기화된 코드 생성
        //const dataURL = "https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info";
		const dataURL = "/data/data.json";
		this.setInitData(dataURL);
    }

    setInitData(dataURL) {
        this.getData(dataURL);
    }

    getData(dataURL) {
        const oReq = new XMLHttpRequest();

        oReq.addEventListener("load", () => {
            console.log(oReq.responseText);
        });
        
        oReq.open('GET', dataURL); // GET 방식으로 데이터를 열고
        oReq.send(); // 데이터를 보낸다.
    }
}

export default Blog;
```

콘솔로그를 통해 데이터를 받아오는지 확인한다.

##### step.4-2 bloglist 추가
받아온 데이터를 이용하여 html에 추가한다.

```js
//ul을 innerHTML로 추가
this.setInitData(dataURL, this.insertPosts); // this.insertPosts 를 콜백으로 넣는다.

 getData(dataURL, fn) { // fn으로 보낸다.
//클래스의 범용성을 위해서 나눠준다.
```

```js
    setInitData(dataURL) {
        this.getData(dataURL, this.insertPosts); // this.insertPosts
    }
```

```js
getData(dataURL, fn) { // 나중에 분리를 위해 fn 콜백함수로 받는다.
        const oReq = new XMLHttpRequest();

        oReq.addEventListener("load", () => {
            //const list = JSON.parse(JSON.parse(oReq.responseText).body); // API 파일에 문제가 있다.
            const list = JSON.parse(oReq.responseText).body;
            fn(list); // 받아온 list를 보낸다.
        });
        
        oReq.open('GET', dataURL); // GET 방식으로 데이터를 열고
        oReq.send(); // 데이터를 보낸다.
    }
```

```js
    insertPosts(list) {
        const ul = document.querySelector(".blogList > ul");
        list.forEach((value) => { // innerHTML로 받아온 데이터를 ul에 li태그 안에 a태그 로 보낸다.
            ul.innerHTML += `<li><a href=${value.link}> ${value.title} </a></li>`;
        })
    }
```

##### step5. Set자료에 데이터 추가(찜하기기능)
```js
//constructor
    this.registerEvent();
```

```js
    registerEvent() { // 가져온 데이터를 보낸다.
        const startBtn = document.querySelector(".start");
        //const dataURL = "https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info";
        const dataURL = "/data/data.json";
        startBtn.addEventListener("click", () => {
            this.setInitData(dataURL);
        });
    }
```

```js
// 찜하기 버튼 생성
ul.innerHTML += `
<li>
<a href=${value.link}> ${value.title} </a>
<div class="like">찜하기</div>
</li>
`;
```

```js
//constructor()
this.likedSet = new Set(); //Set을 추가한다.
this.setInitVariables();

setInitVariables() {
  this.blogList = document.querySelector(".blogList > ul");
}

// 찜하기 이벤트 등록
registerEvent() {
  this.blogList.addEventListener("click", ({target}) => { // 구조분해 할당으로 target만 받는다.
  const targetClassName = target.className;
  if(targetClassName !== "like") return; // like가 아니면 리턴
  const postTitle = target.previousElementSibling.textContent; // 바로앞에 있는 형제노드의 textContent를 뽑아온다.
  this.likedSet.add(postTitle);
  });
}

// getData()
  insertPosts(list) {
    list.forEach((value) => {
      this.blogList.innerHTML += `
      <li>
      <a href=${value.link}> ${value.title} </a>
      <div class="like">찜하기</div>
      </li>
      `;
    })
  }
```

##### step6. 찜목록뷰 업데이트
```js
// 추가하기

// this.blogList.addEventListener("click", ({target}) => {
this.updateLikedList();
//}

  updateLikedList() {
    const ul = document.querySelector(".like-list > ul");
    let likedSum = "";

    // li 태그에 찜리스트를 넣고 한번에 innerHTML을 사용한다.
    this.likedSet.forEach ( (value) => {
      likedSum += `<li> ${value} </li>`
      })
      ul.innerHTML = likedSum;
      }
```

```js
// 클릭 이벤트 수정
  this.blogList.addEventListener("click", ({target}) => { // 구조분해 할당으로 target만 받는다.
  const targetClassName = target.className;
    if(targetClassName !== "like" && targetClassName !=="unlike") return; // like가 아니면 리턴
            
  const postTitle = target.previousElementSibling.textContent; // 바로앞에 있는 형제노드의 textContent를 뽑아온다.

  // 찜 취소를 클릭한 경우에, 찜하기로 다시 변경하고, 찜목록을 제거하고, 찜목록뷰를 렌더링한다.abs
    if(targetClassName === "unlike") {
      target.className = "like";
      target.innerText = "찜하기";
      this.likedSet.delete(postTitle);
    } else {
      target.className = "unlike";
      target.innerText = "찜취소";
      // 찜 목록에 추가
      this.likedSet.add(postTitle);
    }

    // 내 찜 목록 뷰에 추가
    this.updateLikedList();
});
```

