/**
 * Created by xiaer on 2018/9/24.
 */
let {swap} = require('../util/sortHelper')

// ѡ�����򣨽���ֵ������ǰ�棩
function selectionSort(array) {
  for (let i = 0, len = array.length; i < len; ++i) {
    // Ѱ��[I��n]���������Сֵ
    let minIndex = i
    for(let j = i + 1; j < len; ++j) {
      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }
    minIndex !== i && swap(array, i, minIndex)
  }
  return array
}

module.exports = {
  selectionSort
}