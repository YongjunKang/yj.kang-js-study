class Blog {
    constructor() { // 초기화된 코드 생성
        this.setInitVariables();
        this.registerEvent();
        this.likedSet = new Set();
    }

    setInitVariables() {
        this.blogList = document.querySelector(".blogList > ul");
    }

    registerEvent() { // AJAX를 가져오는 코드를 실행하는 함수
        const startBtn = document.querySelector(".start");
        //const dataURL = "https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info";
        const dataURL = "/data/data.json";

        startBtn.addEventListener("click", () => {
            this.setInitData(dataURL);
        });

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
    }

    updateLikedList() {
        const ul = document.querySelector(".like-list > ul");
        let likedSum = "";

        // li 태그에 찜리스트를 넣고 한번에 innerHTML을 사용한다.
        this.likedSet.forEach ( (value) => {
            likedSum += `<li> ${value} </li>`
        })
        ul.innerHTML = likedSum;
    }

    setInitData(dataURL) {
        this.getData(dataURL, this.insertPosts.bind(this)); // 다른쪽을 가르키기 때문에 this를 bind 해준다.
    }

    getData(dataURL, fn) {
        const oReq = new XMLHttpRequest();

        oReq.addEventListener("load", () => {
            //const list = JSON.parse(JSON.parse(oReq.responseText).body); // API 파일에 문제가 있다.
            const list = JSON.parse(oReq.responseText).body;
            fn(list);
        });
        
        oReq.open('GET', dataURL); // GET 방식으로 데이터를 열고
        oReq.send(); // 데이터를 보낸다.
    }

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
}

export default Blog;

