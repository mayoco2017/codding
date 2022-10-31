/*
 * @Date: 2022-10-31 16:56:46
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-10-31 18:19:20
 * @FilePath: /codding/transArrayToTree.js
 * @Description: 一维数组转树结构
 */

/**
 * @description: 方法1，递归寻找
 *
 * @param {*} array
 * @return {*}
 */
function transArrayToTree1(array) {
  const resultTree = [];
  //把list当中符合pid的放到tree里
  const arrayToTree = (tree, list, pid) => {
    list.forEach((item) => {
      if (item.pid === pid) {
        const child = {
          ...item,
          children: [],
        };
        arrayToTree(child.children, list, item.id);
        if (!child.children.length) {
          delete child.children;
        }
        // 加入到树中
        tree.push(child);
      }
    });
  };
  arrayToTree(resultTree, array, null);
  return resultTree;
}

const testList = [
  { id: 1, name: "根元素", pid: null },
  { id: 2, name: "子元素2", pid: 1 },
  { id: 3, name: "子元素3", pid: 2 },
  { id: 4, name: "子元素4", pid: 2 },
  { id: 5, name: "子元素5", pid: 1 },
  { id: 6, name: "子元素6", pid: 3 },
  { id: 7, name: "子元素7", pid: 2 },
];

console.log("this is answer1", transArrayToTree1(testList));
