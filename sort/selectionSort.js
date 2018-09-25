/**
 * Created by xiaer on 2018/9/24.
 */
let {generateRandomArray, printArray, swap, testSort, copyArray} = require('../util/sortHelper')

// 选择排序（将极值放在最前面）
function selectionSort(array) {
  for (let i = 0, len = array.length; i < len; ++i) {
    // 寻找[I，n]区间里的最小值
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

// 插入排序（当前元素与前面所有元素依次比较）
function insertSort(array) {
  for(let i = 1, len = array.length; i < len; ++i) {
    for (let j = i; j > 0 && array[j - 1] > array[j]; --j) {
      // 当元素放入到合适位置，可以直接break；加break和不加break，性能差距很大
      // 插入排序可以提前终止，比选择排序性能好一点点~~~
      swap(array, j, j - 1)
    }
  }
  return array
}
// 插入排序优化（减少swap次数）
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