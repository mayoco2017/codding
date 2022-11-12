/*
 * @Date: 2022-11-12 10:57:25
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-12 11:29:32
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

function pushNodeVal(rootNode, target) {
  //判断根节点是否为null
  if (!rootNode) {
    return null;
  }
  target.push(rootNode.val);
  pushNodeVal(rootNode.left, target);
  pushNodeVal(rootNode.right, target);
}
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
