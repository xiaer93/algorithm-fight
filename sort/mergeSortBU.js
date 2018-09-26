/**
 * Created by xiaer on 2018/9/26.
 */
// 自底向上的归并排序
// 对链表进行排序很有用？
function mergeSortBU (array) {
  for(let sz = 1, len = array.length; sz <= len; sz += sz) {
    for(let i = 0; i + sz < len; i += sz + sz) {
      // 对[i, i + sz - 1]和[i + sz, i + 2*sz - 1]进行归并排序
      _merge(array, i, i + sz - 1, Math.min(i + sz + sz - 1, len - 1))
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
  mergeSortBU
}