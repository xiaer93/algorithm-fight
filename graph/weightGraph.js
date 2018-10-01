/**
 * Created by xiaer on 2018/10/1.
 */
// 有权图

// 有权边
class Edge{
  constructor(a, b, weight){
    this._a = a
    this._b = b
    this._weight = weight
  }

  v() {
    return this._a
  }
  w() {
    return this._b
  }
  weight () {
    return this._weight
  }
  othen (x) {
    return x === this._a ? this._b : this._a
  }
  isLessOther(edge) {
    return this.weight < edge.weight
  }
}

class Graph{
  constructor () {

  }
}
// 邻接矩阵---稠密图
class DenseGraph extends Graph{
  // n为顶点数，m为边数， directed为有向图标志位
  constructor(n, directed = false) {
    super()
    this._n = n
    this._m = 0
    this._directed = directed
    this._graph = new Array(n).fill(0).map(t => new Array(n).fill(null))
  }

  v() {
    return this._n
  }
  e() {
    return this._m
  }
  show () {
    this._graph.forEach((t, i) => {
      let _printStr = `edgeWeight ${i}: `
      t.forEach(e => {
         if(e) {
           _printStr += e.weight() + ', '
         }
      })
      console.log(_printStr)
    })
  }
  addEdge(v, w, weight) {
    if (this.hasEdge(v, w)) {
      this._m -= 1
    }

    // 如果边已经存在，则修改原始边权值。否则新建一个边
    this._graph[v][w] = new Edge(v, w, weight)
    if (!this._directed) {
      this._graph[w][v] = new Edge(w, v, weight)
    }

    this._m += 1
  }
  hasEdge (v, w) {
    return this._graph[v][w]
  }
  // 最小生成树：v-1条边连接所有顶点，并且权值最小.[针对于带权的无向图，针对连通图]
  // 默认所有图都是连通图
  // 切分定理cut Property：在给定任意切分中，横切边中权值最小的边必然属于最小生成树。。。把图中的节点分为2个部分，就是切分。
  lazyPrim () {

  }

  // 时间复杂度： O(v)。遍历了所有顶点
  // 返回有效的边，Edge实例
  *adjIterator(v) {
    let _flagV = this._graph[v]
    for(let i = 0, len = _flagV.length; i < len; ++i){
      if (_flagV[i]) {
        yield _flagV[i]
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
      let _printStr = `Weight ${i}: `
      t.forEach(e => {
        _printStr += e.weight() + ','
      })
      console.log(_printStr)
    })
  }
  // 为避免添加边时间复杂度过高，在此操作中允许平行变，不进行hasEdge判断；
  // 通常处理平行边操作，在所有边添加完成后，统一处理平行边
  addEdge(v, w, weight) {
    this._graph[v].push(new Edge(v, w, weight))

    // 避免自环边
    if (v !== w && !this._directed) {
      this._graph[w].push(new Edge(w, v, weight))
    }
    this._m += 1
  }
  // 时间复杂度O(n)
  hasEdge (v, w) {
    return !this._graph[v].every(e => {
      return e.other() !== v
    })
  }
  // 时间复杂度：O(E)，遍历该节点所有的边
  // 返回某个节点的所有边
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