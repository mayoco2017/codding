/*
 * @Date: 2022-11-05 13:58:55
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-05 14:34:47
 * @FilePath: /codding/debounce.js
 * @Description: 防抖函数，
 * 防抖：事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时，参数：fun函数，wait等待时间，返回一个函数
 * 场景：用户多次点击按钮，resize窗口等
 * 思想：内部维护一个计时器，时间结束后再执行
 */

function debounce(fun,wait){
    let timer = null
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        //重新计时
        const context = this;
        timer = setTimeout(()=>{
            //把参数放到fun下执行
            fun.apply(context, arguments)
            timer = null
        },wait)
    }
}


 const a= debounce(function(){
    this.a = "wo",
    console.log(this.a,arguments);
 },3000)
 a("a")
 a("a")
 a("a")