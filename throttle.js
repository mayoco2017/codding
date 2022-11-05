/*
 * @Date: 2022-11-05 14:00:03
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-05 14:48:14
 * @FilePath: /codding/throttle.js
 * @Description: 
 * 节流：一定时间内，事件多次触发只执行一次，参数：fun，time，返回函数
 * 场景：scroll事件，事件节流来降低事件调用的频率。
 * 实现：维护当前触发时间， 记录当前触发时间，当再次触发时间大于之前时间+time则再次执行，否则不执行
 */
function throttle(fun,time) {
    let prevTime = Date.now();
    return function(){
        const context = this
        const currentTime =  Data.now()
       if(currentTime >= prevTime + time){
            fun.apply(context,arguments)
            //记录
            prevTime = currentTime
        }
    } 
}