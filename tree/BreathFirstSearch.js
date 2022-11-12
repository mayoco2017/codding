/*
 * @Date: 2022-11-12 15:51:55
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-12 16:12:13
 * @FilePath: /codding/tree/BreathFirstSearch.js
 * @Description: BFS,通过队列的方式实现
 */
//https://leetcode.cn/problems/binary-tree-level-order-traversal/description/

function BreathFirstSearch(root) {
  const res = [];
  queue = [];
  if (!root) {
    return res;
  }
  queue.push(root);
  while (queue.length) {
    let length = queue.length;
    const curLevel = [];
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      curLevel.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(curLevel)
  }
  return res
}
