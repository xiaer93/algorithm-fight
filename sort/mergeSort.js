/**
 * Created by xiaer on 2018/9/26.
 */
// 高级排序的通用方案： 对于小分段数据，使用插入排序算法（插入排序在近乎有序的数组中性能非常好）
// 归并排序算法，自顶向下的递归算法，全部为前闭后闭区间
function mergeSort (array) {
  _mergeSort(array, 0, array.length - 1)
}

// 对[left, right]区间数字进行排序
function _mergeSort (array, left, right) {
  // todo: 针对分段小于15个数字的数组，嵌入插入排序算法（非性能级优化，不影响归并算法的时间复杂度）
  if (left < right) {
    let mid = Math.floor((right - left) / 2) + left
    _mergeSort(array, left, mid)
    _mergeSort(array, mid + 1, right)
    // fixme: 归并排序算法的优化，当数组该分段有序时，则不进行_merge算法~
    if (array[mid] > array[mid+1]) {
      _merge(array, left, mid, right)
    }
  }
}

// 对[left, right]区间数字进行排序
function _merge (array, left, mid, right) {
  // 前闭后闭区间
  let i = left,
      j = mid + 1,
      k = left

  // 辅助空间，这也是归并排序的最大缺点~~~
  let tmpArray = []
  while(i <= mid && j <= right) {
    if(array[i] < array[j]) {
      tmpArray.push(array[i++])
    } else {
      tmpArray.push(array[j++])
    }
  }
  while (i <= mid) {
    tmpArray.push(array[i++])
  }
  while (j <= right) {
    tmpArray.push(array[j++])
  }
  
  let index = 0
  while (k <= right) {
    array[k++] = tmpArray[index++]
  }
}

module.exports = {
  mergeSort
}