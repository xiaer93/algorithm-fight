/**
 * Created by xiaer on 2018/9/26.
 */
let {swap} = require('../util/sortHelper')

// �߼������㷨�����Բ��ò�����������Ż�

function quickSort(array) {
  _quickSort(array, 0, array.length - 1)
}

function _quickSort(array, left, right) {
  if (left >= right) {
    // right - left <= 15,���Խ������������Ż��㷨~~~
    return
  }

  // ��������p��ʹ��arr[left, p - 1] С��arr[p], arr[p + 1, right] ����arr[p]
  let p = _partition(array, left, right)
  _quickSort(array, left, p - 1)
  _quickSort(array, p + 1, right)
}

// partition �趨�ֽ�㣬���ҷֽ�~
// arr[l + 1, j] < e && arr[j + 1, i - 1] > e
function _partition(array, left, right) {
  let j = left
  let jNum = array[left]

  for(let i = left + 1; i <= right; i++) {
    if (array[i] <= jNum) {
      swap(array, ++j, i)
    }
  }
  // ���м�������jMid����������~~
  swap(array, left, j)
  return j
}

module.exports = {
  quickSort
}