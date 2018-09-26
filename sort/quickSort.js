/**
 * Created by xiaer on 2018/9/26.
 */
let {swap} = require('../util/sortHelper')

// 高级排序算法都可以采用插入排序进行优化

function quickSort(array) {
  _quickSort(array, 0, array.length - 1)
}

function _quickSort(array, left, right) {
  if (left >= right) {
    // right - left <= 15,可以借助插入排序优化算法~~~
    return
  }

  // 返回索引p，使得arr[left, p - 1] 小于arr[p], arr[p + 1, right] 大于arr[p]
  let p = _partition(array, left, right)
  _quickSort(array, left, p - 1)
  _quickSort(array, p + 1, right)
}

// partition 设定分界点，左右分界~
// arr[l + 1, j] < e && arr[j + 1, i - 1] > e
function _partition(array, left, right) {
  let j = left
  let jNum = array[left]

  for(let i = left + 1; i <= right; i++) {
    if (array[i] <= jNum) {
      swap(array, ++j, i)
    }
  }
  // 将中间数放在jMid处，并返回~~
  swap(array, left, j)
  return j
}

module.exports = {
  quickSort
}