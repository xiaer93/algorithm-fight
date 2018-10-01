/**
 * Created by xiaer on 2018/10/1.
 */

// 邻接矩阵和邻接表
// 邻接表适合稀疏图，邻接矩阵适合稠密图
// 边的数量远远少于点应该有的边数。。。完全图（每个点之间都存在边）

class Graph {
  constructor () {
    this._visited = null
    // 连通分量
    this._cCount = 0
    // 节点相连性
    this._id = null
  }
  // 计算连通分量
  init () {
    this._visited = new Array(this.v()).fill(false)
    this._cCount = 0
    this._id = new Array(this.v()).fill(-1)

    for(let i = 0; i < this.v(); ++i) {
      console.log(this._visited[i])
      if (!this._visited[i]) {
        this._dfs(i)
        this._cCount++
      }
    }
  }
  count() {
    return this._cCount
  }
  isConnected (v, w) {
    return this._id[v] === this._id[w]
  }
  v () {
    throw new Error('必须被子类重写')
  }
  e () {
    throw new Error('必须被子类重写')
  }
  *adjIterator() {
    throw new Error('必须被子类重写')
  }
  _dfs (v) {
    this._visited[v] = true
    this._id[v] = this._cCount
    for(let childV of this.adjIterator(v)) {
      if(!this._visited[childV]) {
        this._dfs(childV)
      }
    }
  }
  _bfs (v) {

  }
}

// 邻接矩阵---稠密图
class DenseGraph extends Graph{
  // n为顶点数， directed为有向图标志位
  constructor(n, directed = false) {
    super()
    this._n = n
    this._m = 0
    this._directed = directed
    this._graph = new Array(n).fill(0).map(t => new Array(n).fill(false))
  }

  v() {
    return this._n
  }
  e() {
    return this._m
  }
  show () {
    this._graph.forEach((t, i) => {
      let _printStr = `vertex ${i}: `
      t.forEach(v => {
        _printStr += (v ? 1 : 0) + ','
      })
      console.log(_printStr)
    })
  }
  // 深度优先遍历，常见应用：连通分量计算


  // 广度优先遍历
  // 在vw加一条边
  addEdge(v, w) {
    if (this.hasEdge(v, w)) {
      return
    }

    this._graph[v][w] = true
    if (!this._directed) {
      this._graph[w][v] = true
    }

    // 有向图无向图，边不做区分？
    this._m += 1
  }
  hasEdge (v, w) {
    return this._graph[v][w]
  }
  // 时间复杂度： O(v)。遍历了所有顶点
  *adjIterator(v) {
    let _flagV = this._graph[v]
    for(let i = 0, len = _flagV.length; i < len; ++i){
      if (_flagV[i]) {
        yield i
      }
    }
  }
}

// 邻接表
class SparseGraph extends Graph{
  constructor(n, directed = false) {
    super()
    this._n = n
    this._m = 0
    this._directed = directed
    // 邻接表还可以借助向量表示，在删除节点和边上效率更好
    // fill填充数组，则对象指向相同
    this._graph = new Array(n).fill(0).map(t => [])
  }
  v () {
    return this._n
  }
  e () {
    return this._m
  }
  show () {
    this._graph.forEach((t, i) => {
      let _printStr = `vertex ${i}: `
      t.forEach(v => {
        _printStr += v + ','
      })
      console.log(_printStr)
    })
  }
  // 为避免添加边时间复杂度过高，在此操作中允许平行变，不进行hasEdge判断；
  // 通常处理平行边操作，在所有边添加完成后，统一处理平行边
  addEdge(v, w) {
    this._graph[v].push(w)

    // 避免自环边
    if (v !== w && !this._directed) {
      this._graph[w].push(v)
    }
    this._m += 1
  }
  // 时间复杂度O(n)
  hasEdge (v, w) {
    return this._graph[v].indexOf(w) !== 0
  }
  // 删除平行边
  removeEdg() {
    this._graph = this._graph.map(t => {
      return [...new Set(t)]
    })
  }
  // 时间复杂度：O(E)，遍历该节点所有的边
  // 返回某个节点的所有邻接节点
  *adjIterator(v) {
    let _retV = this._graph[v]
    for(let i = 0, len = _retV.length; i < len; ++i){
      yield _retV[i]
    }
  }
}

module.exports = {
  DenseGraph,
  SparseGraph
}