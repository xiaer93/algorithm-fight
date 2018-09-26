/**
 * Created by xiaer on 2018/9/24.
 */
// �����������
function generateRandomArray(n, rangL, rangR) {
  let retArray = []
  for(let i = 0; i < n; ++i) {
    retArray.push(Math.floor(Math.random() * (rangR - rangL)) + rangL)
  }

  return retArray
}
function generateNearlyOrderArray(n, swapTimes) {
  let retArray = []
  for(let i = 0; i < n; ++i) {
    retArray[i] = i
  }

  // �����������ӽ�Ϊ���������
  for (let i = 0; i < swapTimes; ++i) {
    let left = Math.floor(Math.random() * n)
    let right = Math.floor(Math.random() * n)
    swap(retArray, left, right)
  }

  return retArray
}
// ��ӡ����
function printArray(array) {
  console.log(...array)
}
// ��������
function swap(array, left, right) {
  let tmp = array[left]
  array[left] = array[right]
  array[right] = tmp
}
// �����㷨����
function testSort(sortFunc, array) {
  let startTime, endTime
  startTime = +new Date()
  sortFunc(array)
  endTime = +new Date()

  let isSort = isSorted(array)

  isSort && console.log(sortFunc.name + ':' + (endTime - startTime) + 'ms')
}
// ���������Ƿ�����ɹ�
function isSorted(array) {
  for(let i = 0, len = array.length - 1; i < len; ++i) {
    if (array[i] > array[i+1]) {
      return false
    }
  }
  return true
}
// ��ȿ�������
function copyArray(array) {
  return JSON.parse(JSON.stringify(array))
}
// ��������
function insertSort(array, left, right) {
  for(let i = 1; i <= right; ++i) {
    let tmpNumber = array[i]
    let j = i
    for(; j > 0 && array[j - 1] > tmpNumber; --j) {
      array[j] = array[j-1]
    }
    array[j] = tmpNumber
  }
}

module.exports = {
  generateRandomArray,
  generateNearlyOrderArray,
  printArray,
  swap,
  testSort,
  copyArray,
  insertSort
}