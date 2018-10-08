/**
 * Created by xiaer on 2018/10/1.
 */
const fs = require('fs')
const readline = require('readline')

// 交换数组
function swap(array, left, right) {
  let tmp = array[left]
  array[left] = array[right]
  array[right] = tmp
}

function testGraph(graphClass) {
  let n = 20
  let m = 100

  let _g = new graphClass(n, false)
  for(let i = 0; i < m; ++i) {
    let _a = Math.floor(Math.random() * n)
    let _b = Math.floor(Math.random() * n)
    _g.addEdge(_a, _b)
  }
  // _g.removeEdg()

  for(let v = 0; v < n; ++v) {
    let _printStr = ''
    let _adj = _g.adjIterator(v)
    for(let w of _adj) {
      _printStr += ' ' + w
    }
    console.log(v + ': ', _printStr)
  }
}

class ReadGraph {
  constructor(graph, filename) {
    // 点和边的数量
    let _v, _e
    let _fileStream = this._readFile(filename, (index, text) => {
      let _text = text.split(' ').map(t => parseFloat(t))

      if (index === 0) {
        _v = _text[0]
        _e = _text[1]
      } else {
        graph.addEdge(_text[0], _text[1], _text[2])
      }
    })
  }
  _readFile(filename, callback) {
    let _r = readline.createInterface({
      input: fs.createReadStream(filename)
    })

    let _index = 0
    _r.on('line', (line) => {
      callback && callback(_index++, line)
    })
  }
}

class MinHeap {
  constructor (compare) {
    // 从[1,开始存储数据
    this._data =[]
    this._count = 0
    // 比较函数，左边 < 右边
    this._leftMinRight = compare || ((left, right) => left < right)
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
    while (tmpK > 0 && this._leftMinRight(this._data[k], this._data[tmpK])) {
      swap(this._data, tmpK, k)
      k = tmpK
      tmpK = Math.floor(k / 2)
    }
  }
  _shiftDown(k) {
    // 当有左子节点时，才继续进行
    while ( 2 * k <= this._count) {
      let  j = 2 * k

      if(j + 1 <= this._count && this._leftMinRight(this._data[j+1], this._data[j])) {
        j = j + 1
      }
      if (this._leftMinRight(this._data[k], this._data[j])){
        break
      }
      swap(this._data, k, j)
      k = j
    }
  }
}

// 最小索引堆
class IndexMinHeap {
  constructor(compare) {
    // 数组存储数据结构
    this._data = []
    this._index = []    // index[x] = i
    this._reverse = []  // reverse[i] = x   reverse[index[x]] = x
    this._count = 0
    this._leftMinRight = compare || ((left, right) => left < right)
  }
  insert(index, value) {
    ++index

    // data存储数据，index存储data的索引
    this._data[index] = value
    this._index[++this._count] = index
    this._reverse[index] = this._count
    this._shiftUp(this._count)
  }
  extractMin() {
    let ret = this._data[this._index[1]]

    swap(this._index, 1, this._count)
    this._count--
    this._shiftDown(1)

    return ret
  }
  extractMinIndex() {
    let ret = this._index[1] - 1

    swap(this._index, 1, this._count)
    this._count--
    this._shiftDown(1)

    return ret
  }
  getMin() {
    return this._data[this._index[1]]
  }
  getMinIndex() {
    return this._index[1] - 1
  }
  change(index, value) {
    this._data[++index] = value
    this._shiftUp(this._reverse[index])
    this._shiftDown(this._reverse[index])
  }
  contain(index) {
    // fixme???
    return this._reverse[index + 1] && this._reverse[index + 1] !== 0
  }
  size() {
    return this._count
  }
  isEmpty() {
    return this._count === 0
  }
  // 操作索引堆，实际比较data的大小
  _shiftUp(k) {
    while (k > 1 && this._leftMinRight(this._data[this._index[k]], this._data[this._index[Math.floor(k / 2)]])) {
      swap(this._index, k, Math.floor(k / 2))
      this._reverse[this._index[Math.floor(k / 2)]] = Math.floor(k / 2)
      this._reverse[this._index[k]] = k
      k = Math.floor(k / 2)
    }
  }
  _shiftDown(k) {
    while (2 * k <= this._count) {
      let j = 2 * k
      if (j + 1 < this._count && this._leftMinRight(this._count && this._data[this._index[j + 1]], this._data[this._index[j]])) {
        j += 1
      }
      if (this._leftMinRight(this._data[this._index[k]], this._data[this._index[j]])) {
        break
      }

      swap(this._index, k, j)
      this._reverse[this._index[k]] = k
      this._reverse[this._index[j]] = j
      k = j
    }
  }
}

class UnionFind{
  constructor(n) {
    this._count = n
    this._parent = new Array(n).fill(0).map((t,i) => i)
    this._rank = new Array(n).fill(1)
  }
  find (p) {
    while (p !== this._parent[p]) {
      // 执行路径压缩，将多层级树降低层级
      this._parent[p] = this._parent[this._parent[p]]
      p = this._parent[p]
    }

    return p
  }
  isConnected (p, q) {
    return this.find(p) === this.find(q)
  }
  union (p, q) {
    let _pRoot = this.find(p)
    let _qRoot = this.find(q)

    if (_pRoot === _qRoot) {
      return
    }

    if (this._rank[_pRoot] < this._rank[_qRoot]) {
      this._parent[_pRoot] = _qRoot
    } else if(this._rank[_pRoot] > this._rank[_qRoot]) {
      this._parent[_qRoot] = _pRoot
    } else {
      this._parent[_pRoot] = _qRoot
      this._rank[_qRoot] += 1
    }
  }
}

module.exports = {
  testGraph,
  ReadGraph,
  MinHeap,
  IndexMinHeap,
  UnionFind
}