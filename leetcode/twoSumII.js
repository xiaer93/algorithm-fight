/**
 * Created by xiaer on 2018/9/25.
 */
// 167,125

// 暴力解法: 时间复杂度O(n^2)

// nlg(n), 二分搜索

// 对撞指针???，O(n)
function twoSum(array, target) {
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

