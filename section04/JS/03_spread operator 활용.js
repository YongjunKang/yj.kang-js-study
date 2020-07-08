function sum(a,b,c) {
    return a+b+c;
}

let pre = [100,200,300];

console.log(sum(...pre)); // 600 a = 100, b = 200, c = 300 으로 배열이 펼쳐져서 들어간다.


// obj 객체를 newObj 객체로 복제
let obj = {
    a: 10,
    b: 20,
    c: 30,
};

let newObj = {...obj};

console.log(newObj); // {a: 10, b: 20, c: 30};

