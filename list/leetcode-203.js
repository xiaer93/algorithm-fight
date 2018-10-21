// 递归的微观解读

// 程序递归调用是有代价的，函数调用+系统栈空间
// 递归优化：尾递归优化+以空间换时间
// 递归调试：1、递归深度变量，打印输出每层结果。

// 链表与递归
// 递归的特性，如何划分为小的问题，递归解决leetcode-203问题~~~
// 编写测试用例

// 递归？本质上，将原来的问题，转化为更小的同一问题
// 如：sum(arr[0,n]) = arr[0] + sum(arr[1, n])//更小的同一问题？？？
// sum(arr[n,n]) = arr[n] + sum([]) //最基本的问题？？？

// 非递归答案

// 递归答案
// 递归删除更小的链表，[节点e+链表]，如果节点e需要删除则返回链表，否则e不删除？
function removeNode (node, val) {
  // 基本问题，结束递归
  if (node === null) {
    return null;
  }

  // 转化原问题为更简单的形式
  let res = removeNode(node.next, val);
  if (node.value === val) {
    // node.next = null????
    return res;
  } else {
    node.next = res;
    return node;
  }
}

// 递归函数要注重：
// 1、本身宏观语意，如本题arr[left,n)
// 2、递归函数就是一个函数，完成一个功能
// 数组求和问题
class Sum {
  sum (arr) {
    return this._sum(arr, 0);
  }
  // 计算arr[left, n)区间内所有数字的和
  _sum (arr, left) {
    // 递归算法基本步骤-1：求解最基本问题
    if (left === arr.length) {
      return 0;
    }
    // 递归算法基本步骤-2：把原问题转化为更小的问题
    return arr[left] + this._sum(arr, left + 1);
  }
}

let s = new Sum();
console.log(s.sum([1, 2, 3, 4, 5, 6, 7, 8]));
