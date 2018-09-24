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
function printArray(array) {
  console.log(...array)
}
function swap(array, left, right) {
  let tmp = array[left]
  array[left] = array[right]
  array[right] = tmp
}

module.exports = {
  generateRandomArray,
  printArray,
  swap
}