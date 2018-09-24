/**
 * Created by xiaer on 2018/9/24.
 */
let {generateRandomArray, printArray, swap} = require('../util/sortHelper')

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

let a = generateRandomArray(1000, 1, 1000)
printArray(selectionSort(a))