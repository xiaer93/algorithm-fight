/**
 * Created by xiaer on 2018/9/27.
 */
// 堆数据结构适合维护动态数据，很少直接用于排序
// 堆数据结构，与优先队列的应用
// 动态cpu任务处理，从n个元素中选出m个元素（优先队列时间复杂度nlogm）

// 优先队列实现方式：
// 普通数组：入队O(1)，出队O(n);
// 顺序数组：入队O(n)，出队O(1);
// 堆： 入队O(lgn)，出队O(lgn)

// 二叉堆：1、每个节点最多2个节点；2、完全二叉树；3、子节点不大于父节点（最大堆）
// 使用数组存储二叉堆，依照层序、自左向右（左节点：父节点序号 * 2；右节点：父节点序号 * 2 + 1）
let  {swap} = require('../util/sortHelper')

// 定义一个最大堆结构
class MaxHeap {
  constructor() {
    this._data = []
    this._count = 0
  }
  createHeap (array) {
    this._data = [, ...array]
    this._count = array.length

    // 计算第一个不为子节点的节点序号~~~！！！递归节点，调用shiftDown，构造最大堆
    for(let i = Math.floor(this._count / 2); i >= 1; i--) {
      this._shiftDown(i)
    }
  }
  insert (value) {
    this._data[++this._count] = value

    // shiftUp
    this._shiftUp(this._count)
  }
  extractMax () {
    let _ret = this._data[1]

    swap(this._data, 1, this._count--)
    this._shiftDown(1)

    return _ret
  }
  print () {
    // 自底向上构建打印列表~~~
    // n层最多节点数量 2^n - 1
    let _depth = Math.floor(Math.log2(this._count)) + 1
    let _padLeft = []

    let _outStr = []

    // 构建最底层打印数据
    let _start = Math.pow(2, _depth - 1)
    let _end = Math.pow(2, _depth) - 1
    let _gap = 0
    let _str = ''
    for(let j = _start; j <= _end; ++j) {
      _padLeft[j] = _gap
      _gap += 2

      _str = _insert(_str, _padLeft[j], this._data[j])
    }
    _outStr.push(_str)

    // 自底向上构建所有的打印数据~
    for(let i = _depth - 1; i > 0; --i) {
      _str = ''
      let _start = Math.pow(2, i - 1)
      let _end = Math.pow(2, i) - 1
      for(let j = _start; j <= _end; ++j) {
        _padLeft[j] = Math.floor((_padLeft[j * 2] + _padLeft[j * 2 + 1]) / 2)
        _str = _insert(_str, _padLeft[j], this._data[j])
      }
      _outStr.push(_str)
    }

    // 打印最大堆
    for(let i = _outStr.length - 1; i>= 0; --i) {
      console.log(_outStr[i])
    }

    // 构建每一行的字符串
    function _insert(str, gap, number = 0) {
      let _len = str.length
      if (_len < gap * 3 + 2) {
        str = str.padEnd(gap * 3, ' ')
        str += number.toString().padStart(2, '0')
      } else {
        str = str.substring(0, gap * 3) + number.toString().padStart(2, '0') + str.substring(gap * 3 + 2)
      }

      return str
    }
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
  _shiftDown (k) {
    // 向下移动元素，递归直至满足最大条件
    // todo：可以尝试通过插入排序优化这个步骤
    while (2 * k <= this._count) {
      let j = 2 * k
      if ( j + 1 <= this._count && this._data[j + 1] > this._data[j]) {
        j += 1
      }

      if (this._data[k] >= this._data[j]){
        break
      }
      swap(this._data, k, j)
      k = j
    }
  }
}

// 定义一个最小堆结构
class MinHeap {
  constructor () {
    // 从[1,开始存储数据
    this._data =[]
    this._count = 0
  }
  insert(value) {
    this._count += 1
    this._data[this._count] = value
    this._shiftUp(this._count)
  }
  extractMin() {
    let retValue = this._data[1]
    swap(this._data, 1, this._count--)
    this._shiftDown(1)
    debugger
    return retValue
  }
  size() {
    return this._count
  }
  isEmpty() {
    return this._count ===0
  }
  _shiftUp(k) {
    let tmpK = Math.floor(k / 2)
    while (tmpK > 0 && this._data[tmpK] > this._data[k]) {
      swap(this._data, tmpK, k)
      k = tmpK
      tmpK = Math.floor(k / 2)
    }
  }
  _shiftDown(k) {
    // 当有左子节点时，才继续进行
    while ( 2 * k <= this._count) {
      let  j = 2 * k

      if(j + 1 <= this._count && this._data[j+1] < this._data[j]) {
        j = j + 1
      }
      if (this._data[k] <= this._data[j]){
        break
      }
      swap(this._data, k, j)
      k = j
    }
  }
}

// fixme: index和reverse索引，减少算法复杂度~~~index减少了交换，reverse减少了修改~~~
class IndexMaxHeap {
  constructor () {
    // data储存数据，index储存索引，count为总数
    this._data = []
    this._index = []
    this._count = 0
    this._reverse = []
  }
  insert (value) {
    this._data[++this._count] = value
    this._index[this._count] = this._count
    this._reverse[this._count] = this._count
    this._shiftUp(this._count)
  }
  extractMax () {
    let _ret = this._data[this._index[1]]
    swap(this._index, 1, this._count--)
    this._reverse[this._index[1]] = 1
    this._reverse[this._index[this._count--]] = 0
    this._shiftDown(1)

    return _ret
  }
  extractMaxIndex () {
    let _ret = this._index[1]
    return _ret
  }
  getItem (index) {
    return this._data[index]
  }
  // n + lgn.所以时间复杂度： O(n)
  change (index, value) {
    this._data[index] = value

    // 找到 _index[k] === index
    let _k = this._index.findIndex(t => t === index)
    this._shiftUp(_k)
    this._shiftDown(_k)
  }
  changeReverse (index, value) {
    this._data[index] = value

    // 使用reverse减少事件复杂度，现在为O(1)
    let _k = this._reverse[index]
    this._shiftUp(_k)
    this._shiftDown(_k)
  }
  isEmpty () {
    return this._count === 0
  }
  // shiftUp和shiftDown对索引index进行交换操作，避免直接处理
  _shiftUp (k) {
    let _tmpK = Math.floor( k / 2)
    while (k > 1 && this._data[this._index[k]] > this._data[this._index[_tmpK]]) {
      // 交换索引
      swap(this._index, k, _tmpK)
      this._reverse[this._index[k]] = k
      this._reverse[this._index[_tmpK]] = _tmpK
      k = _tmpK
      _tmpK = Math.floor( k / 2)
    }
  }
  _shiftDown (k) {
    while (2 * k <= this._count) {
      let j = 2 * k
      if ( j + 1 <= this._count && this._data[this._index[j + 1]] > this._data[this._index[j]]) {
        j += 1
      }

      if (this._data[this._index[k]] >= this._data[this._index[j]]){
        break
      }
      swap(this._index, k, j)
      this._reverse[this._index[k]] = k
      this._reverse[this._index[j]] = j
      k = j
    }
  }
}

// 算法复杂度：nlogn
function heapSort1(array) {
  let _heap = new MaxHeap()
  for(let i = 0, len = array.length; i < len; ++ i) {
    _heap.insert(array[i])
  }

  for(let i = array.length - 1; i >= 0; i --) {
    array[i] = _heap.extractMax()
  }
}

// 算法复杂度: O(n)
function heapSort2(array) {
  let _heap = new MaxHeap()
  // 直接处理数据，借助ShiftDown构建堆数组
  _heap.createHeap(array)

  for(let i = array.length - 1; i >= 0; --i) {
    array[i] = _heap.extractMax()
  }
}

// 上面2个堆排序，空间复杂度为O(n)。可以在原地堆排序，进行排序，空间复杂度将为O(1)
// parent(i) = (i-1)/2  leftChild(i) = 2*i + 1, rightChild = 2*i + 2
function heapSort3(array) {
  for(let i = Math.floor((array.length - 1) / 2); i >= 0; i--) {
    _shiftDown(array, array.length-1, i)
  }
  for(let i = array.length - 1; i > 0; i--) {
    swap(array, 0, i)
    _shiftDown(array, i - 1, 0)
  }


  function _shiftDown (array, count, k) {
    // 向下移动元素，递归直至满足最大条件
    // todo：可以尝试通过插入排序优化这个步骤
    while (2 * k + 1 <= count) {
      let j = 2 * k + 1
      if ( j + 1 <= count && array[j + 1] > array[j]) {
        j += 1
      }

      if (array[k] >= array[j]){
        break
      }
      swap(array, k, j)
      k = j
    }
  }
}

let a = new MinHeap()
for(let i = 0; i < 20; i++) {
  a.insert(Math.floor(Math.random() * 100))
}
// console.log(a.extractMaxIndex(), a.getItem(a.extractMaxIndex()))

while (!a.isEmpty()) {
  console.log(a.extractMin())
}


module.exports = {
  heapSort1,
  heapSort2,
  heapSort3
}
