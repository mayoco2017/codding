/*
 * @Date: 2022-11-17 09:30:00
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-17 17:15:11
 * @FilePath: /codding/interview/1117.js
 * @Description: 拼多多
 */

//有30个小孩，编号1-30，围成圈进行报数，数到3的小孩退出后重新开始报数，问最后剩下编号多少
function findLastOne(total, n) {
  const queue = Array(total)
    .fill(0)
    .map((_i, index) => index + 1);
  let num = 0;
  while (queue.length > 1) {
    const item = queue.shift();
    num++;
    if (num % n) {
      queue.push(item);
    }
  }
  return queue;
}
class NodeList {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}
//链表方法
function findLastOneLike(total, n) {
  let num = 1;
  const first = new NodeList(num, null);
  let cur = first;
  //初始化链表
  while (num < total) {
    cur.next = new NodeList(num++, null);
    if (num === total) {
      cur.next.next = first;
    }
      cur = cur.next
    
  }
  let size = total;
  //此时cur在倒数第一个这个位置，所以开始是-1
  let step = -1;
  while (size > 1) {
    step++;
    if (!(step % n)&&step!==0) {
      cur.next = cur.next.next;
      size --;
    } else {
      cur = cur.next;
    }
  }
  return cur.val
}

console.log(findLastOne(30, 3));
console.log(findLastOneLike(30, 3));
console.log(findLastOne(38, 3));
console.log(findLastOneLike(38, 3));
