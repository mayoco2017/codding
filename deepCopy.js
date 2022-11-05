/*
 * @Date: 2022-11-05 14:01:00
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-05 15:51:36
 * @FilePath: /codding/deepCopy.js
 * @Description: 深拷贝
 * 传人值的类型1、基本类型；2、fun；3、array、4、object；
 * 注意：引用类型的循环引用，解决方法：将应用指针存入map，在每次拷贝引用类型时去map中寻找，有则为循环应用
 */

function deepClone(obj, map = new WeakMap()) {
  if (typeof obj !== "object" || !obj) {
    //基本类型
    return obj;
  }
  if (map.get(obj)) {
    return map.get(obj);
  }
  let cloneTarget;
  if (obj instanceof Array) {
    cloneTarget = obj.map((i) => deepClone(i));
  } else if (obj instanceof Function) {
    cloneTarget = new Function("return " + obj.toString())();
  } else if (obj instanceof Object) {
    const keys = Object.keys(obj);
    cloneTarget = {}
    keys.forEach((key) => {
      cloneTarget[key] = deepClone(obj[key], map);
    });
  }
  map.set(obj, cloneTarget);
  return cloneTarget;
}

console.log(deepClone(233));
console.log(deepClone({"23":222,"3":2}));