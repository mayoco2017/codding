/*
 * @Date: 2022-11-12 20:04:53
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-12 20:24:04
 * @FilePath: /codding/tree/practice/BFS.js
 * @Description:
 */
function brachFirstSearch(root) {
  //利用队列
  const queue = [];
  res = [];
  if (!root) return res;
  queue.push(root);
  while (queue.length) {
    const curLevel = [];
    const length = queue.length;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      curLevel.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(curLevel);
  }
  return res;
}
function brachFirstSearch1(root) {
  //利用队列
  const queue = [];
  res = [];
  if (!root) return res;
  queue.push(root);
  while (queue.length) {
    const node = queue.shift();
    res.push(node.val)
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return res;
}

[a, b1, b2];
