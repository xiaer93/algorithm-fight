/**
 * Created by xiaer on 2018/9/25.
 */
// 类似题目：167,125,344,345,11
// 对撞指针：2个指针向内逼近，指针移动规则清楚明确~
let {binarySearch} = require('../search/binarySearch')

// 暴力解法: 时间复杂度O(n^2)
function twoSum (array, target) {
  let ret = [-1, -1]
  for(let i = 0, len = array.length; i < len; ++i) {
    for(let j = i + 1; j < len; ++j) {
      if ((array[i] + array[j]) === target) {
        ret[0] = i
        ret[1] = j
      }
    }
  }

  return ret
}

// nlg(n), 二分搜索
function twoSum2 (array, target) {
  let ret = [-1, -1]
  for(let i = 0, len = array.length; i < len; ++i) {
    let tmp = target - array[i]

    let j = binarySearch(tmp)
    if (j !== -1) {
      ret[0] = i
      ret[1] = j
    }
  }
  return ret
}

// 对撞指针???，O(n)
function twoSum3(array, target) {
  let l = 0,
    r = array.length - 1

  let ret = [-1, -1]
  while (l < r) {
    let sum = array[l] + array[r]
    if (sum === target) {
      ret[0] = l + 1
      ret[1] = r + 1
    } else if (sum < target) {
      l++
    } else {
      r--
    }
  }

  return ret
}

