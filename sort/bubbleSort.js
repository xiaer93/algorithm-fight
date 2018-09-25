/**
 * Created by xiaer on 2018/9/25.
 */
let {swap} = require('../util/sortHelper')

// fixme: 冒泡排序适用什么情况？

// 冒泡排序算法，优化，性能？
function bubbleSort (array) {
  for(let i = 0, len = array.length; i < len; ++i) {
    for(let j = len; j > i; --j) {
      if(array[j - 1] > array[j]) {
        swap(array, j-1, j)
      }
    }
  }
  return array
}

// 冒泡算法优化。当数列比较有序时，性能较好？
function bubbleSort2 (array) {
  let isSort = false
  for(let i = 0, len = array.length; i < len && !isSort; ++i) {
    isSort = true
    for(let j = len; j > i; --j) {
      if (array[j-1] > array[j]) {
        swap(array, j-1, j)
        isSort = false
      }
    }
  }
}

module.exports = {
  bubbleSort,
  bubbleSort2
}