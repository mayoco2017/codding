/*
 * @Date: 2022-11-19 17:58:01
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-19 19:45:31
 * @FilePath: /codding/practice/1119.js
 * @Description:
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

//1. 合并两个有序链表，合并后还是有序
function mergeLinkNodes(head1, head2) {
  const prev = new ListNode(null, null);
  let cur1 = head1;
  let cur2 = head2;
  while (cur1 && cur2) {
    if (!cur1) {
        prev.next = cur2
        cur2 = cur2.next
    } else if (!cur2) {
        prev.next = cur1
        cur1 = cur1.next
    } else {
        if(cur1.val>=cur2.val){
            prev.next = cur1
            cur1 = cur1.next
        }else{
            prev.next = cur2
            cur2 = cur2.next
        }
        prev = prev.next
    }
  }
  return prev.next
}
//2. 找出两个链表第一个公共节点（公共节点是指同一个引用，即值相同，下一个节点指向也相同）
function findLinkNodesSame(head1, head2) {
    let cur1 = head1;
    let cur2 = head2;
    while(cur1){
        while(cur2){
            if(cur1.val === cur2.val&&cur1.next === cur2.next){
                break;
            }
            cur2 = cur2.next
        }
        if(cur2){
            break;
        }
        cur1 = cur1.next
    }
    return cur1
  }

//3. 链表节点去重，去除链表中值相同的节点（思路：数组|map）
function removeLinkNodesSame(head) {
    const prev = new ListNode(null,head)
    let cur = prev;
    const map = new Map()
    while(cur&&cur.next){
        const item =  map.get(cur.next.val)
        if(item){
            item.next = item.next.next
        }else{
            map.set(cur.next.val,cur)
        }
        cur = cur.next 
    }
    return prev.next
  
  }

//4. 回文链表判断（和回文字符串类似）
function isPalindromic(head) {
    //把链表里面的数取出来放到数组里，再看看是不是回文数组
    let res = true;
    if(!head) return res
    const valList = []
    let cur = head
    while(cur){
        valList.push(cur.val)
        cur = cur.next;
    }

    for (let index = 0; index < valList.length>>>1; index++) {
        if(valList[index]!==valList[valList.length-index-1]){
            return  res = false
        }
        
    }

    return res
  }
