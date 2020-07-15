/* utility */

export const _ = {
    log(data) {
        if(window.console) console.log
    }
}

export default function log(data) { // data 인자값을 받아서 log를 찍는 함수를 내보낸다.
    console.log(data);
}

export const getTime = () => { // 외부에서 사용하기 위해 export
    return Date.now();
}

export const getCurrentHour = () => {
    return (new Date).getHours();
}