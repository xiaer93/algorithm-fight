/**
 * Created by xiaer on 2018/9/24.
 */
// 生成随机数组
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

  // 交互，创建接近为有序的数组
  for (let i = 0; i < swapTimes; ++i) {
    let left = Math.floor(Math.random() * n)
    let right = Math.floor(Math.random() * n)
    swap(retArray, left, right)
  }

  return retArray
}
// 打印数组
function printArray(array) {
  console.log(...array)
}
// 交换数组
function swap(array, left, right) {
  let tmp = array[left]
  array[left] = array[right]
  array[right] = tmp
}
// 测试算法性能
function testSort(sortFunc, array) {
  let startTime, endTime
  startTime = +new Date()
  sortFunc(array)
  endTime = +new Date()

  let isSort = isSorted(array)

  isSort && console.log(sortFunc.name + ':' + (endTime - startTime) + 'ms')
}
// 检验数组是否排序成功
function isSorted(array) {
  for(let i = 0, len = array.length - 1; i < len; ++i) {
    if (array[i] > array[i+1]) {
      return false
    }
  }
  return true
}
// 深度拷贝数组
function copyArray(array) {
  return JSON.parse(JSON.stringify(array))
}
// 插入排序
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