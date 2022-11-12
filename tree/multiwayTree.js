/*
 * @Date: 2022-11-12 16:23:39
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-12 16:49:27
 * @FilePath: /codding/tree/multiwayTree.js
 * @Description:多叉树的遍历，遍历root，拿到所有的name值；
 */
var root = {
  name: "A",
  children: [
    {
      name: "B1",
      children: [
        {
          name: "C1",
          children: [
            {
              name: "D",
              children: [
                {
                  name: "D1",
                  children: [{ name: "F1 " }, { name: "F2" }],
                },
                { name: "D2" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "B2",
      children: [{ name: "C2" }, { name: "C3" }],
    },
  ],
};

//深度优先递归，根，左，右
function deepFirstSearch(root, res = []) {
  if (!root) return res;
  res.push(root.name);
  if (root.children && root.children.length > 0) {
    root.children.map((r) => deepFirstSearch(r, res));
  }
  return res;
}
const dfs = deepFirstSearchI(root);
console.log(dfs);
//深度优先迭代
function deepFirstSearchI(root, res = []) {
  if (!root) return res;
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    res.push(node.name);
    if (node.children && node.children.length) {
      //先进后出，由于是深度优先，就让最后的先进，所以reverse一下
      node.children.reverse().map((r) => {
        stack.push(r);
      });
    }
  }
  return res;
}
//广度优先，queue
function breachFirstSearch(root, res = []) {
  if (!root) return res;
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const node = queue.shift();
    res.push(node.name);
    if (node.children && node.children.length) {
      //队列，先进先出，
      node.children.map((r) => {
        queue.push(r);
      });
    }
  }
  return res;
}
const bfs = breachFirstSearch(root);
console.log(bfs);
