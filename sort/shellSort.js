/**
 * Created by xiaer on 2018/9/25.
 */
let {swap} = require('../util/sortHelper')

// 自insertSort插入排序衍生而来的高级算法~~~ 复杂度：：：n ^ 2/3

function shellSort (array) {
  // 生成稳定间隔 h = 3*h + 1
  let len = array.length
  let hList = [1]
  let tmpH = 1
  while (tmpH < len) {
    tmpH = 3 * tmpH + 1
    hList.push(tmpH)
  }

  // 基于插入排序的高级排序算法
  while (hList.length !== 0) {
    tmpH = hList.pop()
    // 构建小的分组数组
    for(let k = 0; k < tmpH; ++k) {
      // 适用基本排序算法：：：插入排序~~~
      for(let i = 0; i < len; i = i + tmpH) {
        let tmpNumber = array[i]
        let j = i
        for(; j > 0 && array[j - tmpH] > tmpNumber; j = j - tmpH) {
          array[j] = array[j - tmpH]
        }
        array[j] = tmpNumber
      }
    }
  }
}

module.exports = {
  shellSort
}