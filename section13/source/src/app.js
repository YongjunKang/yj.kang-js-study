import log, {getTime, getCurrentHour, _} from './utility.js'; //export는 객체형태로 넘어오기 때문에 destructuring
import {CodeSquad} from './class.js';
// web-pack 설정에 따라 확장자 생략가능

const root = document.querySelector('#root');
root.innerHTML = `<p>Hello World!</p>`

log('my first test data') // myLogger의 log 함수를 불러와서 사용한다.
log(`getTime is ${getTime()}`);
log(`current hour is ${getCurrentHour()}`);

const cs = new CodeSquad();
log(`lectures : ${cs.getLectures()}`);

_.log("new hello");