/**
 * Created by xiaer on 2018/9/25.
 */
let {swap} = require('../util/sortHelper')
// 插入排序（当前元素与前面所有元素依次比较）
function insertSort(array) {
  for(let i = 1, len = array.length; i < len; ++i) {
    for (let j = i; j > 0 && array[j - 1] > array[j]; --j) {
      // 当元素放入到合适位置，可以直接break；加break和不加break，性能差距很大
      // 插入排序可以提前终止，比选择排序性能好一点点~~~
      swap(array, j, j - 1)
    }
  }
  return array
}
// 插入排序优化（减少swap次数）
// insert适用于近乎有序的数组，性能非常好；甚至比高级排序算法性能更好~~~
function insertSort2(array) {
  for(let i = 1, len = array.length; i < len; ++i) {
    let tmpNumber = array[i]
    let j = i
    for(; j > 0 && array[j - 1] > tmpNumber; --j) {
      array[j] = array[j-1]
    }
    array[j] = tmpNumber
  }
  return array
}

module.exports = {
  insertSort,
  insertSort2
}