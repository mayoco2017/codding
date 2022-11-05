
/*
 * @Date: 2022-11-05 13:58:28
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-05 20:33:05
 * @FilePath: /codding/PromiseFun.js
 * @Description: Promise 串行请求，有序返回
 * 思想：利用 then中如果返回的是Promise对象，则会吧resolve和reject继续传递下去
 */
function getDatasByOrder(urls) {
    let p = fetch(urls[0]);
    for (let i = 1; i < urls.length; i++) {
        //返回下一个请求对象，再进行链式调用
      p = p.then(() => {
        return fetch(urls[i])
      })
    }
  }


  /*
 * @Description: Promise 限制并发：写一个类MyQueue，包含add方法，给后台发送请求（调用fetch即可），限制同一时刻最多3个请求。（不考虑发送失败的情况）
 * 思想：放入等待执行的队列，执行完成后再执行吓一跳
 */
  class MyQueue{
     constructor(max){
        this.max = max;//最大并发数
        this.pending = 0;//执行中的
        this.noStart = []//没开始的
     }
     add(url){
        return new Promise((resolve)=>{
            this.noStart.push({url,resolve})
            this.start()
        })
     }
     start(){
        if(this.pending<this.max && this.noStart.length){
            this.pending++
            const f = this.noStart.shift()
            fetch(f.url).then((data)=>{
                this.pending --;
                this.start();
                f.resolve(data)
            })
        }
     }

}

// 如下 调用举例
let myQueue = new MyQueue(); 
for (let i = 0; i < 100000; i++) { 
  myQueue.add(url).then(() => { 
    console.log(`消息${i}发送成功`)
  })
}