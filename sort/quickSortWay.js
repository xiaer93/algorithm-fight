/**
 * Created by xiaer on 2018/9/26.
 */
let {swap} = require('../util/sortHelper')
// 针对大量重复元素，快排的第二种优化思路：三路快排
// 三路快排将数组分为3部分， arr[l+1, lt] < v   arr[lt + 1, i - 1] === v   arr[gt, r] > v
// 不再需要对=v的元素进行排序处理，只需要处理 <v   >v

function quickSortWay(array) {
  _quickSortWay(array, 0, array.length - 1)
}

function _quickSortWay(array, left, right) {
  if (left >= right) {
    return
  }

  let [lt, gt] = _partition(array, left, right)
  _quickSortWay(array, left, lt)
  _quickSortWay(array, gt, right)
}

function _partition(array, left, right) {
  swap(array, left, Math.floor(Math.random() * (right - left)) + left)

  let lt = left,  //arr[l+1, lt] < v
    gt = right + 1, // arr[gt, r] > v
    i = left + 1, //arr[lt + 1, i - 1] === v
    mid = array[left]

  while(i < gt) {
    if (array[i] < mid) {
      swap(array, ++lt, i++)
    } else if (array[i] > mid) {
      swap(array, --gt, i)
    } else {
      i++
    }
  }
  swap(array, left, lt--)
  return [lt, gt]
}

module.exports = {
  quickSortWay
}