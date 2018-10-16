/**
 * Created by xiaer on 2018/9/25.
 */
let {swap} = require('../util/sortHelper')

// 计数排序，统计0，1，2的个数
// 时间复杂度：O(n)，空间复杂度：O(1)
function sortColor(array) {
  let count = [0,0,0]
  for(let i = 0,len = array.length; i < len; ++i) {
    count[array[i]] += 1
  }

  let index = 0
  for(let i = 0, len = count.length; i < len; ++i) {
    let iCount = count[i]
    for(let j = 0; j < iCount; ++j) {
      array[index++] = i
    }
  }
}

// 3路快速排序算法，只进行了一次遍历~~~
// 时间复杂度：O(n)，空间复杂度：O(1)
function sortColor2(array) {
  // [0，zero]为0， [zero + 1, two - 1]为1, [two, n-1]为2
  let zero = -1,
    two = array.length

  for (let i = 0; i < two; ) {
    // 循环不变量
    if (array[i] === 1) {
      i++
    } else if (array[i] === 2) {
      swap(array, --two, i)
    } else {
      swap(array, ++zero, i)
      i++
    }
  }
}

let ary = [1,2,0,1,2,0,0]
sortColor2(ary)
console.log(ary)