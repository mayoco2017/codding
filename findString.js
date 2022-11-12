/*
 * @Date: 2022-11-07 22:22:14
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-07 22:56:58
 * @FilePath: /codding/findString.js
 * @Description: 给一个字符串（如'abbbcdedyyhdaboousdcbjsbdj'），找出里面出现次数最多的字符和数量（如果结果有多个字符并列，需要都列出）
 * 思路：哈希表，遍历一遍字符串，把出现的数字放入哈希表，最后找到表里重复最多的字符串
 */

function findStringRept(str) {
  if (str.length < 1) return 0;
  const map = new Map();
  for (let i = 0; i < str.length; i++) {
    let count = (map.get(str[i]) || 0) + 1;
    map.set(str[i], count);
  }
  let result = [];
  let num = 0;
  //遍历map取最大
  map.forEach((value, key) => {
    if (value === num) {
      result.push(key);
    } else if (value > num) {
      num = value;
      result = [key];
    }
  });
  return { result, num };
}
console.log(findStringRept("s"));
