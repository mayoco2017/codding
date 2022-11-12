/*
 * @Date: 2022-11-06 22:08:06
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-08 00:03:31
 * @FilePath: /codding/review1106.js
 * @Description: 今天浅浅复习写一写
 */

Function.prototype.MyApply = function (context) {
  if (typeof this !== "function") {
    return new TypeError(`${context} is not function`);
  }
  context = context || window;
  context.fn = this;
  const args = arguments[1];
  const result = args ? context.fn(...args) : context.fn();
  delete context.fn;
  return result;
};
Function.prototype.MyCall = function (context) {
  if (typeof this !== "function") {
    return new TypeError("this is not function");
  }
  context = context || window;
  context.fn = this;
  const [_f, ...args] = arguments;
  const result = args.length ? context.fn(...args) : context.fn();
  delete context.fn;
  return result;
};

// function a (x,y){
//     console.log(x,y,this.b);
// }
// a(1,2)
// a.MyCall({b:"this is b"},1,2)
function tttt(array1, array2) {
  let index = -1;
  let lastChar = array2[array2.length - 1];
  let latestArray2 = array2.slice(0, array2.length - 1);
  for (let i = 0; i <= array1.length - 1; i++) {
    if (array1[i] === lastChar) {
      index = i;
    }
  }
  if (index === -1) {
    console.log("在if");
    tttt(array1, latestArray2);
  }else{
    return { index, lastChar, latestArray2 };
  }

}
const array1 = ["D", "B", "G", "E", "H", "J", "A"];
const array2 = ["D", "G", "J", "H", "E", "B", "I", "F", "C"];
function name(array1,array2) {
    if ( array1.length<5) {
       console.log(1111);
      }else{
        return array2
      }
}

console.log("data", tttt(array1, array2));
