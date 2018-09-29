/**
 * Created by xiaer on 2018/9/25.
 */
// 二分法时间复杂度：O(lg2 n)  N*（1/2）^x=1；则x=logn,底数是2
// array为有序数组，target为待查找对象
// 如果找到target则返回索引，否则返回-1
function binarySearch(array, target) {
  // 将变量的含义定义清楚，方便理解和使用~~~
  // 在【left, right】的范围里寻找target
  let left = 0,
    right = array.length - 1

  //
  while (left <= right) {
    // 循环不变量，要始终维护循环不变量~~~
    // 循环中和循环结束时循环不变量和循环终止条件必须同时成立。
    // let mid = Math.floor((left + right) / 2)
    let mid = Math.floor((right - left) / 2) + left //避免数字极大时溢出错误~~~
    if (array[mid] < target) {
      left = mid + 1  // target在[mid + 1, r]中~~~
    } else if (array[mid] > target) {
      right = mid - 1 // target在[l, mid - 1]中~~~
    } else {
      return mid
    }
  }

  return -1
}

// 通过递归实现二分查找法，递归的思想和非递归的区别？递归性能略差
// 二分查找法的变种函数： floor和ceil查找元素下上边界索引~~~

module.exports = {
  binarySearch
}