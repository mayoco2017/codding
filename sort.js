/*
 * @Date: 2022-11-07 22:01:51
 * @LastEditors: lj 1093876183@qq.com
 * @LastEditTime: 2022-11-07 22:19:34
 * @FilePath: /codding/sort.js
 * @Description: 快速排序
 * 思想：1.取数组中的任意一个值，给数组内的其他值比较，小的放在左容器，大的放在右容器，
 * 2、左右容器递归执行这样操作，最后合并
 */

function sort(arr){
    //特殊，arr只有一个值不需要操作
    if(arr.length <=1 ) return arr;
    const minList = [];
    const maxList =[];
    const temp = arr[0];
    for(let i=1;i<arr.length;i++){
        if(arr[i]>=temp){
            maxList.push(arr[i])
        }else{
            minList.push(arr[i])
        }
    }
    return  sort(minList).concat([temp]).concat(sort(maxList))
    
}

console.log(sort([1,5,6,7,2,3,5]));