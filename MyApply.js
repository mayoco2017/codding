/*
 * @Date: 2022-11-05 14:01:24
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-06 22:06:53
 * @FilePath: /codding/MyApply.js
 * @Description: apply,call,bind实现
 * 思想将要执行的函数，绑定到传入的context在用。执行再删掉
 */

Function.prototype.myApply = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};

// call函数实现，与apply只有参数不一样，传入的是单个参数
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
    result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};

// bind函数实现，同样是改变函数this指向，返回一个待执行函数
Function.prototype.myBind = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
    // 判断 context 是否传入，如果未传入则设置为 window
    context = context || window;
  // 将调用函数设为对象的方法
  fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
