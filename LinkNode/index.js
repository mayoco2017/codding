/*
 * @Date: 2022-11-18 20:41:00
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-18 22:29:13
 * @FilePath: /codding/LinkNode/index.js
 * @Description:设计链表
 */

//定义链表
class ListNode {
  val;
  next = null;
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}
//构建链表
function createListNode(arr) {
  if (!arr.length) return null;
  const head = new ListNode(arr[0], null);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i], null);
    cur = cur.next;
  }
  return arr;
}

//给定其中一个节点，将此节点往前移动一步的方法，即相当于和它前面节点位置互换
function moveForward(head,node) {
    if(head === node) return head;
    let cur = head
     while(cur){
        if(cur.next === node){
            const next  = node.next;
            node.next = cur;
            cur.next = next
            break;
        }
        cur = cur.next
     }
     return head
}

//单链表反转编码
function reverseListNode(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}

//判断链表是否有环
function isAnyCircle(head) {
  let isCircle = false;
  if (!head) return isCircle;
  let prev = (next = head);
  while (prev && prev.next) {
    prev = prev.next.next;
    next = next.next;
    if (prev === next) {
      isCircle = true;
      break;
    }
  }
  return isCircle;
}

//给定一个数字数组，找出和为 n 的元素所有组合
function findAssemblageTarget(arr, target) {}
