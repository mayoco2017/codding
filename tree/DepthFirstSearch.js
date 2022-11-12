/*
 * @Date: 2022-11-12 10:57:25
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-12 15:49:34
 * @FilePath: /codding/tree/DepthFirstSearch.js
 * @Description: 二叉树的深度优先遍历 DFS
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

//前序遍历，根-左-右
//https://leetcode.cn/problems/binary-tree-preorder-traversal/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  const target = [];
  pushNodeVal(root, target);
  return target;
};
//递归
function pushNodeVal(rootNode, target) {
  //判断根节点是否为null
  if (!rootNode) {
    return null;
  }
  target.push(rootNode.val);
  pushNodeVal(rootNode.left, target);
  pushNodeVal(rootNode.right, target);
}
//迭代法，用栈来实现
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversalIteration = function (root) {
  //判断root是否存在
  const res = [];
  if (!root) return res;
  //栈中先放入根节点
  const stack = [root];
  //当前节点
  let cur = null;
  while (stack.length) {
    //取出当栈中的节点
    cur = stack.pop();
    res.push(cur.val);
    //先放\U0001f236右再放左，这样出栈顺序就是根-左-右
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }
  return res;
};

//中序遍历，左-根-右
//https://leetcode.cn/problems/binary-tree-postorder-traversal/
var inorderTraversal = function (root) {
  const l = [];
  function showNode(node) {
    if (!node) {
      return null;
    }
    showNode(node.left);
    l.push(node.val);
    showNode(node.right);
  }
  showNode(root);
  return l;
};
//迭代法，先走完所有的左节点，在走根节点和右节点
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const res = [];
  if (!root) return res;
  const stack = [];
  let cur = root;
  while (stack.length || cur) {
    //从左节点开始走将左遍走完
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    } else {
      //左子树走完，开始弹出
      cur = stack.pop();
      res.push(cur.val);
      cur = cur.right;
    }
  }
  return res;
};

//后续遍历，左-右-根
//https://leetcode.cn/problems/binary-tree-inorder-traversal/
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  const target = [];
  pushNodeVal(root, target);
  return target;
};

function pushNodeVal(rootNode, target) {
  //判断根节点是否为null
  if (!rootNode) {
    return null;
  }
  pushNodeVal(rootNode.left, target);
  pushNodeVal(rootNode.right, target);
  target.push(rootNode.val);
}

//迭代法，用栈来实现，前序遍历的思想，最后反转一下结果，注意出入站顺序
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversalIteration = function (root) {
  //判断root是否存在
  const res = [];
  if (!root) return res;
  //栈中先放入根节点
  const stack = [root];
  //当前节点
  let cur = null;
  while (stack.length) {
    //取出当栈中的节点
    cur = stack.pop();
    res.push(cur.val);
    //先放左再放右，这样出栈顺序就是根-右-左，反转后就是左-右-根
    cur.left && stack.push(cur.left);
    cur.right && stack.push(cur.right);
  }
  return res.reverse();
};

//统一迭代法：标记法要处理的节点放入栈之后，紧接着放入一个空指针作为标记
var preorderTraversal = function (root, res = []) {
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      //如果是标记，则取值
      res.push(stack.pop().val);
      continue;
    }
    if (node.right) stack.push(node.right); // 右
    if (node.left) stack.push(node.left); // 左
    stack.push(node); // 中
    stack.push(null);
  }
  return res;
};
// 前序遍历：中左右
// 压栈顺序：右左中
// 中序遍历：左中右
// 压栈顺序：右中左
// 后续遍历：左右中
// 压栈顺序：中右左
