/**
 * Created by xiaer on 2018/9/27.
 */
// 堆数据结构，与优先队列的应用
// 动态cpu任务处理，从n个元素中选出m个元素（优先队列时间复杂度nlogm）

// 优先队列实现方式：
// 普通数组：入队O(1)，出队O(n);
// 顺序数组：入队O(n)，出队O(1);
// 堆： 入队O(lgn)，出队O(lgn)

// 二叉堆：1、每个节点最多2个节点；2、完全二叉树；3、子节点不大于父节点（最大堆）
// 使用数组存储二叉堆，依照层序、自左向右（左节点：父节点序号 * 2；右节点：父节点序号 * 2 + 1）
let  {swap} = require('../util/sortHelper')

class MaxHeap {
  constructor() {
    this._data = []
    this._count = 0
  }
  insert (value) {
    this._data[++this._count] = value

    // shiftUp
    this._shiftUp(this._count)
  }
  print () {
    // 自底向上构建打印列表~~~
    // n层最多节点数量 2^n - 1
    let _depth = Math.floor(Math.log2(this._count)) + 1
    let _padLeft = [0, 20 * (_depth - 1)]
  }
  size () {
    return this._count
  }
  isEmpty () {
    return this._count === 0
  }
  _shiftUp (k) {
    // 新加入元素与父元素进行比较，递归进行交换
    let tmpK = Math.floor(k / 2)
    while ( k > 1 && this._data[tmpK] < this._data[k]) {
      swap(this._data, tmpK, k)
      k = tmpK
      tmpK = Math.floor(k / 2)
    }
  }
}

let a = new MaxHeap()
for(let i = 0; i < 20; i++) {
  a.insert(Math.floor(Math.random() * 100))
}
a.print()