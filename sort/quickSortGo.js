/**
 * Created by xiaer on 2018/9/26.
 */
let {swap} = require('../util/sortHelper')
// ����ڴ����ظ����飬��������Ч���ֻ�����~~~
// ��partition�����Ż���ʹ��˫ָ�룬�������ҷ�Ƭʱ��ĳһ�����ݹ�����ɲ����⡣ arr[l+1, i -1] <= v arr[j + 1, r] >= v
function quickSortGo(array) {
  _quickSortGo(array, 0, array.length - 1)
}

function _quickSortGo(array, left, right) {
  if (left >= right) {
    return
  }

  // ��������p��ʹ��arr[left, p - 1] С��arr[p], arr[p + 1, right] ����arr[p]
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
