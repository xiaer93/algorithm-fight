/**
 * Created by xiaer on 2018/9/26.
 */
let {swap} = require('../util/sortHelper')
// 针对于大量重复数组，快速排序效率又回退了~~~
// 对partition进行优化，使用双指针，避免左右分片时，某一边内容过多造成不均衡。 arr[l+1, i -1] <= v arr[j + 1, r] >= v
function quickSortGo(array) {
  _quickSortGo(array, 0, array.length - 1)
}

function _quickSortGo(array, left, right) {
  if (left >= right) {
    return
  }

  // 返回索引p，使得arr[left, p - 1] 小于arr[p], arr[p + 1, right] 大于arr[p]
  let p = _partition2(array, left, right)
  _quickSortGo(array, left, p - 1)
  _quickSortGo(array, p + 1, right)
}

function _partition2(array, left, right) {
  swap(array, left, Math.floor(Math.random() * (right - left)) + left)

  // arr[l+1, i -1] <= v   arr[j + 1, r] >= v
  let mid = array[left]
  let i = left + 1,
    j = right

  while (true) {
    while ( i <= right && array[i] < mid) {
      i++
    }
    while (left + 1 <= j && array[j] > mid) {
      j--
    }

    if(i > j) {
      break
    }
    swap(array, i++, j--)
  }
  swap(array, left, j)
  return j
}

module.exports = {
  quickSortGo
}
