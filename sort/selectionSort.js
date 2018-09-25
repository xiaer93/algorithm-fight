/**
 * Created by xiaer on 2018/9/24.
 */
let {generateRandomArray, printArray, swap, testSort, copyArray} = require('../util/sortHelper')

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

// �������򣨵�ǰԪ����ǰ������Ԫ�����αȽϣ�
function insertSort(array) {
  for(let i = 1, len = array.length; i < len; ++i) {
    for (let j = i; j > 0 && array[j - 1] > array[j]; --j) {
      // ��Ԫ�ط��뵽����λ�ã�����ֱ��break����break�Ͳ���break�����ܲ��ܴ�
      // �������������ǰ��ֹ����ѡ���������ܺ�һ���~~~
      swap(array, j, j - 1)
    }
  }
  return array
}
// ���������Ż�������swap������
function insertSort2(array) {
  for(let i = 1, len = array.length; i < len; ++i) {
    let tmpNumber = array[i]
    let j = i
    for(; j > 0 && array[j - 1] > tmpNumber; --j) {
      array[j] = array[j-1]
    }
    array[j] = tmpNumber
  }
  return array
}

let a = generateRandomArray(10000, 1, 1000)
// printArray(selectionSort(a))

let a1 = copyArray(a)
let a2 = copyArray(a)
let a3 = copyArray(a)

testSort(selectionSort, a1)
testSort(insertSort, a2)
testSort(insertSort2, a3)