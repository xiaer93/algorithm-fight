/**
 * Created by xiaer on 2018/9/26.
 */
// 原始快速排序对于近乎有序数组，性能非常差~~~
// 生成递归树，中间值划分不可靠，最差的情况退化到O(n^2)
let {swap, insertSort} = require('../util/sortHelper')

function quickSortBT(array) {
  _quickSortBT(array, 0, array.length - 1)
}

function _quickSortBT(array, left, right) {
  if (right - left <= 15) {
    insertSort(array, left, right)
    return
  }
  let p = _partition(array, left, right)
  _quickSortBT(array, left, p - 1)
  _quickSortBT(array, p + 1, right)
}

function _partition(array, left, right) {
  // todo：随机取一个中间值，避免有序数组中退化到O(n^2)的时间复杂度~~~
  swap(array, left, Math.floor(Math.random() * (right - left)) + left)
  let j = left,
      jMid = array[left]

  for(let i = left + 1; i <= right; ++i) {
    if (array[i] < jMid) {
      swap(array, ++j, i)
    }
  }

  swap(array, left, j)
  return j
}

module.exports = {
  quickSortBT
}