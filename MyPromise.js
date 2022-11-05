/*
 * @Date: 2022-11-05 13:57:39
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-05 16:27:02
 * @FilePath: /codding/MyPromise.js
 * @Description: 自己写一个promise
 *  new Promise((resolve, reject) => {
 * xxxx
 * resolve(val)
 * }).then((val)=>{});
    返回：Promise
    特征：拥有一个状态，状态一旦change，不能变回来
1.创建一个promise，传递一个执行器(立即执行)，参数为resolve方法(参数成功值)，和reject方法(参数失败原因)
2.promise中维护一个state，只有三种状态，pending，fulfilled，rejected,且一旦从pending变为fulfilled，或rejected不能再次改变
resolve方法，执行成功，将状态改为 fulfilled，取出成功list的cb执行
reject方法，执行失败，将状态改为 rejected，取出失败list的cb执行
2.then方法：两个参数，成功cb，失败cb，判断状态调用相应的cb，若为等待状态，则保存回调到对应list；
3.then方法的链式调用：then方法内返回promise对象,并将对应cb的返回值传递给对应回调函数
4、then方法识别promise对像自返回
5.then捕获错误
7.then参数可选
*/
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

function resolvePromise(promise2, x, resolve, reject) {
  //判断返回的是否是自身
  if (promise2 === x) {
     // 如果返回值跟当前promise2相等，循环引用需要报错
    return reject(new TypeError("Chaining cycle detected for promise"));
  }
  if (x instanceof MyPromise) {
    //如果返回值是promise则继续向下传递cb和值
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

class MyPromise {
  /** promise状态 */
  status = PENDING
  /** promise值 */
  value = undefined
  /** 错误原因 */
  reason = undefined
  /** resolve的回调合集 */
  onResolvedCallbackArr = []
  /** reject的回调合集 */
  onRejectedCallbacksArr = []

  resolve = (value) => {
      if(this.status === PENDING) {
          this.status = FULFILLED
          this.value = value
          this.onResolvedCallbackArr.forEach((cb) => {
              cb(value)
          })
      }
  }
  reject = (reason) => {
      if(this.status === PENDING) {
          this.status = REJECTED
          this.reason = reason
          this.onRejectedCallbacksArr.forEach((cb) => {cb(reason)})
      }
  }

  constructor(exe) {
      try {
          exe(this.resolve, this.reject)
      } catch (e) {
          this.reject(e)
      }
  }

  then = (onResolvedCallback, onRejectedCallback) => {
      // 非函数，穿透传值
      onResolvedCallback = typeof onResolvedCallback === 'function' ? onResolvedCallback : (v) => v
      onRejectedCallback = typeof onRejectedCallback === 'function' ? onRejectedCallback : (r) => r

      let promise2 = new MyPromise((resolve, reject) => {
          if (this.status === FULFILLED) {
              /** setTimeout强制异步，使promise2可以获取到 */
              setTimeout(() => {
                  try {
                      // 得到外部回调函数的返回值x
                      const x = onResolvedCallback(this.value)
                      // 如果返回值跟当前promise2相等，循环引用需要报错
                      resolvePromise(promise2,x,resolve,reject)
                  } catch (e) {
                      reject(e)
                  }
              })
          } else if (this.status === REJECTED) {
              /** setTimeout强制异步，使promise2可以获取到 */
              setTimeout(() => {
                  try {
                      // 得到外部回调函数的返回值x
                      const x = onRejectedCallback(this.reason)
                      resolvePromise(promise2,x,resolve,reject)
                  } catch (e) {
                      reject(e)
                  }
              })
          } else {
              // pending状态，添加回调函数到回调合集中
              this.onResolvedCallbackArr.push(() => {
                  /** setTimeout强制异步，使promise2可以获取到 */
                  setTimeout(() => {
                      try {
                          // 得到外部回调函数的返回值x
                          const x = onResolvedCallback(this.value)
                          resolvePromise(promise2,x,resolve,reject)
                      } catch (e) {
                          reject(e)
                      }
                  })
              })
              this.onRejectedCallbacksArr.push(() => {
                  /** setTimeout强制异步，使promise2可以获取到 */
                  setTimeout(() => {
                      try {
                          // 得到外部回调函数的返回值x
                          const x = onRejectedCallback(this.reason)
                          resolvePromise(promise2,x,resolve,reject)
                      } catch (e) {
                          reject(e)
                      }
                  })
              })
          }
      })

      return promise2

  }

  finally = (cb) => this.then(
      res =>
      MyPromise.resolve(cb()).then(() => res),
      reason => 
      MyPromise.resolve(cb()).then(() => {throw new Error(reason)}))

  catch = (cb) => this.then(undefined, cb)

  static all = (arr) => {
      /** 返回值为promise对象 */
      return new MyPromise((resolve, reject) => {
          const result = [];
          let index = 0;

          const addData = (key, val) => {
              /** 即使为异步也要保持先后顺序一致，所以需要key-val维护数组中的下标及值 */
              result[key] = val
              /** 每次进入自加 */
              index++
              if (index === arr.length) {
                  resolve(result)
              }
          }
          arr.forEach((p, index) => {
              /** 判断类型 */
              if (p instanceof MyPromise) {
                  p.then(res => addData(index, res), reason => reject(reason))
              } else {
                  /** 普通类型直接返回 */
                  addData(index,p)
              }
          })
      })
  }

  static race = (arr) => {
      /** 返回值为promise对象 */
      return new MyPromise((resolve, reject) => {
          // 是否已经返回
          let flag = false

          const addData = (val) => {
              /** 如果未返回，则返回后将标志指为true */
              if (!flag) {
                  resolve(val)
                  flag = true
              }
          }
          arr.forEach(p => {
              // 如果race数组中p有同步且执行完毕，flag=true，则后续不执行
              if (flag) {
                  return
              }
              /** 判断类型 */
              if (p instanceof MyPromise) {
                  p.then(res => addData(res), reason => reject(reason))
              } else {
                  /** 普通类型直接返回 */
                  addData(p)
              }
          })
      })
  }

  static resolve = val => val instanceof MyPromise ? val : new MyPromise((res) => res(val))

}
