/**
 * Created by xiaer on 2018/10/1.
 */
const  {MinHeap, IndexMinHeap, UnionFind} = require('../util/graphHelper')
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
  other (x) {
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
  /*最小生成树和最短路径算法，对于有向图和无向图均成立！！！*/

  // 如果横切边相同，则可能存在多个最小生成树？？？？

  // 最小生成树：v-1条边连接所有顶点，并且权值最小.[针对于带权的无向图，针对连通图]
  // 默认所有图都是连通图
  // 切分定理cut Property：在给定任意切分中，横切边中权值最小的边必然属于最小生成树。。。把图中的节点分为2个部分，就是切分。
  // 时间复杂度 O(ElogE)
  lazyPrimMST () {
    let self = this
    let _pq = new MinHeap((left, right) => left.weight() < right.weight())
    let _marked = new Array(this.v()).fill(false)
    // 返回最小生成树
    let mst = []
    let mstWeight = 0

    _visite(0)
    while (!_pq.isEmpty()){
      let e = _pq.extractMin()
      // 如果两个节点颜色相同，则处于同一个切分中
      if (_marked[e.v()] === _marked[e.w()]){
        continue
      }
      mst.push(e)
      if(!_marked[e.v()]) {
        _visite(e.v())
      }else {
        _visite(e.w())
      }
    }

    mstWeight = mst.reduce((total, edge) => {
      return total + edge.weight()
    }, 0)

    // 私有函数 访问某个节点
    function _visite (v) {
      _marked[v] = true

      // 遍历所有的相邻邻顶点，如果该节点未被访问则将对应的边加入队列
      for(let e of self.adjIterator(v)) {
        if (!_marked[e.other(v)]) {
          _pq.insert(e)
        }
      }
    }
  }
  // 时间复杂度O(ElogV)
  prim() {
    let self = this
    let _ipq = new IndexMinHeap()
    let _marked = new Array(this.v()).fill(false)
    let _edgeTo = new Array(this.v()).fill(null)  // 存储每个节点最短的横切变
    // 返回最小生成树
    let mst = []
    let mstWeight = 0

    _visit(0)
    while (!_ipq.isEmpty()) {
      // 获取最短邻接边
      let _v = _ipq.extractMinIndex()
      mst.push(_edgeTo[_v])
      _visit(_v)
    }

    mstWeight = mst.reduce((total, edge) => {
      return total + edge.weight()
    }, 0)
    console.log(mst)
    console.log(mstWeight)

    function _visit (v) {
      _marked[v] = true

      for(let e of self.adjIterator(v)) {
        let _w = e.other(v)
        if (!_marked[_w]) {
          if (!_edgeTo[_w]) {
            _ipq.insert(_w, e.weight())
            _edgeTo[_w] = e
          } else if (e.weight() < _edgeTo[_w].weight()) {
            _edgeTo[_w] = e
            _ipq.change(_w, e.weight())
          } else {
            continue
          }
        }
      }
    }
  }
  // 时间复杂度O()
  // 借助unionFind判断是否为环
  kruskal() {
    let _pq = new MinHeap((left, right) => left.weight() < right.weight())
    let _uf = new UnionFind(this.v())

    let mst = []
    let mstWeight = 0

    // 将所有边放入最小堆，构建最小堆
    for(let  i = 0; i < this.v(); ++i) {
      for(let e of this.adjIterator(i)) {
        // 避免放入重复边，无向图？
        if (e.v() < e.w()) {
          _pq.insert(e)
        }
      }
    }

    // 循环取出最小边，判断是否结成环，如果没有结成环则加入mst
    while (!_pq.isEmpty()) {
      let _e = _pq.extractMin()
      if(_uf.isConnected(_e.v(), _e.w())) {
        continue
      }
      mst.push(_e)
      _uf.union(_e.v(), _e.w())
    }

    mstWeight = mst.reduce((total, edge) => {
      return total + edge.weight()
    }, 0)
    console.log(mst)
    console.log(mstWeight)
  }

  // 最短路径问题shortestPath，松弛操作是求最短路径的核心
  // 单源最短路径
  // 路径规划、工作任务规划

  // 图中不能有负权边，复杂度：Elog(v)
  // 单元最短路径
  // 每次处理尚未marked的最短路径的节点。则最短路劲的节点v一定为单源最短路径，因为即使有其他路径可以到达点v，但是必须绕道其他节点必然增加路径长度。
  dijkstra(s) {
    // 顶点s
    let s = s
    // 顶点到其它点最短路径
    let _distTo = new Array(this.v()).fill(0)
    // 顶点是否已经被迭代器遍历
    let _marked = new Array(this.v()).fill(false)
    // 顶点最小边是否存在---最短路径是who？即
    let _from = new Array(this.v()).fill(null)

    let _ipq = new IndexMinHeap((left, right) => left < right)

    _distTo[s] = 0
    _marked[s] = true
    _ipq.insert(s, _distTo[s])
    while (!_ipq.isEmpty()) {
      let _v = _ipq.extractMinIndex()
      _marked[_v] = true

      // 松弛操作
      for(let _e of this.adjIterator(_v)) {
        let _w = _e.other(_v)
        if(!_marked[_w]) {
          if (_from[_w] === null || _distTo[_v] + _e.weight() < _distTo[_w]) {
            _distTo[_w] = _distTo[_v] + _e.weight()
            _from[_w] = _e
            if(_ipq.contain(_w)) {
              _ipq.change(_w, _distTo[_w])
            } else {
              _ipq.insert(_w, _distTo[_w])
            }
          }
        }
      }
    }

    // 最短路径，是否连通
  }

  // 最短路径处理负权边
  // 拥有负权环的图，没有最短路径。。。
  // 前提条件，图中不能有负权环，该算法可以判断图中是否有负权环
  // 时间复杂度O(ev)

  // 从一个点到另一个点的最短路径，最多经过所有的v个顶点，有v-1条边。否则存在负权环
  // 对所有点进行v-1次松弛操作
  bellmanFord(s) {
    let _distTo = new Array(this.v()).fill(0)
    let _from = new Array(this.v()).fill(null)
    let _hasNegativeCycle = false

    for(let pass = 1; pass < this.v(); ++pass) {
      for(let i = 0; i < this.v(); ++i) {
        for(let e of this.adjIterator(i)) {
          // 多次松弛操作，e.w节点是否有最短边，是否有松弛最短边
          if(!_from[e.w()] || _distTo[e.v()] + e.weight() < _distTo[e.w()]) {
            _distTo[e.w()] = _distTo[e.v()] + e.weight()
            _from[e.w()] = e
          }
        }
      }
    }

    // 在进行一次松弛操作，如果还可以松弛则包含负权环。
    _hasNegativeCycle = _checkhasNegativeCycle()

    // 检查是否包含负权环
    function _checkhasNegativeCycle () {
      for(let pass = 1; pass < this.v(); ++pass) {
        for(let i = 0; i < this.v(); ++i) {
          for(let e of this.adjIterator(i)) {
            // 多次松弛操作，e.w节点是否有最短边，是否有松弛最短边
            if(!_from[e.w()] || _distTo[e.v()] + e.weight() < _distTo[e.w()]) {
              return true
            }
          }
        }
      }
      return false
    }
    //hasPathTo, shortestPath,negativeCycle

  }

  // 最短路径的补充；1、distTo[w] = 正无穷；2、queue-based bellman-ford优化算法
  // dijkstra 无负权边，有向无向均可，O(ElogV)
  // bellman-ford 无负权环，有向图，O(VE)
  // 利用拓扑排序 有向无环图DAG，有向图，O(V + E)
  // 所有对最短路径算法，Floyed，处理无负权环的图，O(V^3)
  // 最长路径算法？？？





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