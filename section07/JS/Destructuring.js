let a, b ,rest;
[a, b] = [10, 20];

console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50] 배열의 나머지를 할당한다.

let newData = ["JS", "GO", "NODE"];
let [Data1,,Data2] = newData; 
// newData 배열의 1번 인덱스 데이터를 Data1, 3번 인덱스 데이터를 Data2로 할당
// 2번 인덱스는 할당하지 않는다.

console.log(Data1, Data2); //JS NODE

let newObj = {
    name : "Kang",
    address : "korea",
    age: 26
}

let {name, address} = newObj;
console.log(name, address); // Kang korea
// 객체의 지정한 키의 값을 받아온다.

let {name:newName, age:newAge} = newObj;
console.log(newName, newAge); // Kang 26
// 다른 이름으로 저장해서 새로운 값을 출력한다.

let Data = [ // Data 데이터 배열
        { 
            "title" : "data1",
            "point": "40.266044,-74.718479",
            "homeTeam":"Lawrence Library", 
            "awayTeam":"LUGip", 
            "markerImage":"images/red.png", 
            "information": "Linux users group meets second Wednesday of each month.", 
            "fixture":"Wednesday 7pm", 
            "capacity":"", 
            "previousScore":"" 
        }, 
        { 
            "title" : "data2",
            "point" : "40.211600,-74.695702", 
            "homeTeam":"Hamilton Library", 
            "awayTeam":"LUGip HW SIG",
            "markerImage":"images/white.png",
            "information": "Linux users can meet the first Tuesday of the month to work out harward and configuration issues.",
            "fixture":"Tuesday 7pm",
            "capacity":"",
            "tv":"" 
        } 
];

let [data1] = Data;
console.log(data1); // 0번째 인덱스에 있는 data1의 정보를 받아온다.

let [,data2] = Data;
console.log(data2); // 1번째 인덱스에 있는 data2의 정보를 받아온다.

let {title, point, homeTeam} = data1;
let {awayTeam, markerImage, fixture} = data2;

console.log(title, point, homeTeam); // data1 해당 객체의 키의 값을 받아온다.
console.log(awayTeam, markerImage, fixture); //data2 해당 객체의 키의 값을 받아온다.

let [{title, point}] = Data;
let [,{homeTeam, fixture}] = Data;

console.log(title, point);
console.log(homeTeam, fixture);
// 한번에 처리할 수 있다.