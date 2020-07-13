const el = document.querySelector("p");

/*
el.addEventListener("click", function(evt) {
    console.log(this); // p 태그를 가리키고 있다.
});
*/

/*
const myObj = {
     register() {
        el.addEventListener("click", function(evt) {
            this.printData();
     }.bind(this));
    },

    printData() {
        console.log('clicked!!');
    } 
}

myObj.register();
*/

const myObj = {
    register() { // myObj 안의 함수
       el.addEventListener("click", (evt) => { // 콜백함수
           this.printData(evt.target); // bind 없이 this가 가리키는게 선언된 부분을 가리킨다.
    });
   },

   printData() {
       console.log('clicked!!', el.innerText);
   } 
}

myObj.register();