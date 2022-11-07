/*
 * @Date: 2022-11-06 22:08:06
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-06 22:55:33
 * @FilePath: /codding/review1106.js
 * @Description: 今天浅浅复习写一写
 */

Function.prototype.MyApply = function(context){
    if(typeof this !== "function" ){
        return new TypeError(`${context} is not function`);
    }
    context = context || window;
    context.fn = this;
    const args = arguments[1]
    const result = args?context.fn(...args):context.fn()
    delete context.fn;
    return result
}
Function.prototype.MyCall= function(context){
    if(typeof this !== "function"){
        return new TypeError("this is not function")
    }
    context = context ||window;
    context.fn = this;
    const [_f,...args] = arguments;
    const result = args.length?context.fn(...args): context.fn()
    delete context.fn
    return result
}

function a (x,y){
    console.log(x,y,this.b);
}
a(1,2)
a.MyCall({b:"this is b"},1,2)
