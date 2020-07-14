/*
const testObj = {
    showHello : function() {
        console.log(`안녕하세요 ${this.name} 님`);
    }
}

const myObj = Object.assign(Object.create(testObj), {
    name: "Kang",
})

console.log(myObj);
*/

/*
const newObj = {
    showHello : function() {
        console.log(`안녕하세요 ${this.name}님 현재 위치는 ${this.location} 입니다.`);
    }
};

const myObj = {
    name : "Kang",
    location : "Korea",
};

let result = Object.setPrototypeOf(myObj, newObj);
console.log(result.showHello()); // 안녕하세요 Kang님 현재 위치는 Korea 입니다.
*/

const newObj = {
    showHello : function() {
        console.log(`안녕하세요 ${this.name}님 오늘 약속시간은 ${this.time} 입니다.`);        
    },

    setTime : function(newTime) {
        this.time = newTime;
    }
}

const myObj = Object.setPrototypeOf({
    name : "Kang",
    time : "14:20",
}, newObj);

console.log(myObj.showHello()); // 안녕하세요 Kang님 오늘 약속 시간은 14:20 입니다.

// 일치여부

const obj1 = {
    name : "Kang",
    age : 26,
    location : "korea",
    test : "new",
}

const obj2 = {
    name : "Kang",
    age : 26,
    location : "korea",
}

const obj3 = Object.assign({}, obj2);

// 값은 동일하다.
console.log(obj1);
console.log(obj2);
console.log(obj3);

// 값은 동일하더라도 서로 다른 객체이므로 모두 false
console.log(obj1 === obj2);
console.log(obj2 === obj3);
console.log(obj3 === obj1);

// 값은 동일하므로 모두 true
console.log(obj1.name === obj2.name);
console.log(obj2.name === obj3.name);
console.log(obj3.name === obj1.name);

const obj3 = Object.assign({}, obj2, {
    "test" : "new",
})

console.log(obj3.test === obj1.test); // true