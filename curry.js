/*
 * @Date: 2022-11-05 14:00:40
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-05 15:14:46
 * @FilePath: /codding/curry.js
 * @Description: 函数柯里化
 * 柯里化是一种函数的转换，它是指将一个函数从可调用的 f(a, b, c) 转换为可调用的 f(a)(b)(c)；参数：fun，输出：fun
 * 实现：递归，如果参数足够则返回执行普通函数，如果不够则返回函数， curried包装后的函数，接受新参数
 */

function curry(fun){
    return function curried(...args){
        if(args.length >= fun.length){
          return  fun.apply(this,args)
        }else{
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
              }
        }
    }

}

function test(a,b,c){
    console.log(a,b,c);
}

curry(test)(1)(2)