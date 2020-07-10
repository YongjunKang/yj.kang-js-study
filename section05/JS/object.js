/*
const name = "Kang";
const age = 26;

const obj = {
    name: name,
    age: age,
};

console.log(obj);
*/

/*
function getObj() {
    const name = "Kang";

    const getName = function() {
        return name; // kang을 반환한다.
    }

    const setName = function(newname) {
        name = newname;
    }

    const printName = function() {
        console.log(name);
    }

    return {
        getName : getName,
        setName : setName
    }
}

let obj = getObj() 
console.log(obj); // {getName: f, setName: f}
console.log(obj.getName()); // Kang
*/

function getObj() {
    const name = "Kang";

    const getName = function() {
        return name; // kang을 반환한다.
    }

    const setName = function(newname) {
        name = newname;
    }

    const printName = function() {
        console.log(name);
    }

    return {getName, setName};
}

let obj = getObj() 
console.log(obj); // {getName: f, setName: f}
console.log(obj.getName()); // Kang

