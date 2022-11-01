/*
 * @Date: 2022-10-31 16:56:46
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-01 12:49:06
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
        //创建children，递归调arrayToTree，给arrayToTree加入满足条件的子元素
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

function transArrayToTree2(array){
    //创建一个id：item映射
    //遍历list将符合条件的项放入映射
    const idItemMap = {}
    array.forEach((item)=>{
        idItemMap[item.id] = item
        idItemMap["root"] = {}
    })
    array.forEach((item)=>{
        if(idItemMap[item.pid||"root"].children){
            idItemMap[item.pid||"root"].children.push(item) 
        }else{
            idItemMap[item.pid||"root"].children = [item]
        }
        
    })
    return idItemMap["root"].children
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
console.log("this is answer2", transArrayToTree2(testList));
