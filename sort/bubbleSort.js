/**
 * Created by xiaer on 2018/9/25.
 */
let {swap} = require('../util/sortHelper')

// fixme: ð����������ʲô�����

// ð�������㷨���Ż������ܣ�
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

// ð���㷨�Ż��������бȽ�����ʱ�����ܽϺã�
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