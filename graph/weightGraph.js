/**
 * Created by xiaer on 2018/10/1.
 */
const  {MinHeap, IndexMinHeap, UnionFind} = require('../util/graphHelper')
// ��Ȩͼ

// ��Ȩ��
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

// �ڽӾ���---����ͼ
class DenseGraph extends Graph{
  // nΪ��������mΪ������ directedΪ����ͼ��־λ
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

    // ������Ѿ����ڣ����޸�ԭʼ��Ȩֵ�������½�һ����
    this._graph[v][w] = new Edge(v, w, weight)
    if (!this._directed) {
      this._graph[w][v] = new Edge(w, v, weight)
    }

    this._m += 1
  }
  hasEdge (v, w) {
    return this._graph[v][w]
  }
  /*��С�����������·���㷨����������ͼ������ͼ������������*/

  // ������б���ͬ������ܴ��ڶ����С��������������

  // ��С��������v-1�����������ж��㣬����Ȩֵ��С.[����ڴ�Ȩ������ͼ�������ͨͼ]
  // Ĭ������ͼ������ͨͼ
  // �зֶ���cut Property���ڸ��������з��У����б���Ȩֵ��С�ı߱�Ȼ������С��������������ͼ�еĽڵ��Ϊ2�����֣������з֡�
  // ʱ�临�Ӷ� O(ElogE)
  lazyPrimMST () {
    let self = this
    let _pq = new MinHeap((left, right) => left.weight() < right.weight())
    let _marked = new Array(this.v()).fill(false)
    // ������С������
    let mst = []
    let mstWeight = 0

    _visite(0)
    while (!_pq.isEmpty()){
      let e = _pq.extractMin()
      // ��������ڵ���ɫ��ͬ������ͬһ���з���
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

    // ˽�к��� ����ĳ���ڵ�
    function _visite (v) {
      _marked[v] = true

      // �������е������ڶ��㣬����ýڵ�δ�������򽫶�Ӧ�ı߼������
      for(let e of self.adjIterator(v)) {
        if (!_marked[e.other(v)]) {
          _pq.insert(e)
        }
      }
    }
  }
  // ʱ�临�Ӷ�O(ElogV)
  prim() {
    let self = this
    let _ipq = new IndexMinHeap()
    let _marked = new Array(this.v()).fill(false)
    let _edgeTo = new Array(this.v()).fill(null)  // �洢ÿ���ڵ���̵ĺ��б�
    // ������С������
    let mst = []
    let mstWeight = 0

    _visit(0)
    while (!_ipq.isEmpty()) {
      // ��ȡ����ڽӱ�
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
  // ʱ�临�Ӷ�O()
  // ����unionFind�ж��Ƿ�Ϊ��
  kruskal() {
    let _pq = new MinHeap((left, right) => left.weight() < right.weight())
    let _uf = new UnionFind(this.v())

    let mst = []
    let mstWeight = 0

    // �����б߷�����С�ѣ�������С��
    for(let  i = 0; i < this.v(); ++i) {
      for(let e of this.adjIterator(i)) {
        // ��������ظ��ߣ�����ͼ��
        if (e.v() < e.w()) {
          _pq.insert(e)
        }
      }
    }

    // ѭ��ȡ����С�ߣ��ж��Ƿ��ɻ������û�н�ɻ������mst
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

  // ���·������shortestPath���ɳڲ����������·���ĺ���
  // ��Դ���·��
  // ·���滮����������滮

  // ͼ�в����и�Ȩ�ߣ����Ӷȣ�Elog(v)
  // ��Ԫ���·��
  dijkstra(s) {
    // ����s
    let s = s
    // ���㵽���������·��
    let _distTo = new Array(this.v()).fill(0)
    // �����Ƿ��Ѿ�������
    let _marked = new Array(this.v()).fill(false)
    // ������С���Ƿ����
    let _from = new Array(this.v()).fill(null)

    let _ipq = new IndexMinHeap()

    _distTo[s] = 0
    _marked[s] = true
    _ipq.insert(s, _distTo[s])
    while (!_ipq.isEmpty()) {
      let _v = _ipq.extractMinIndex()
      _marked[_v] = true

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

    // ���·�����Ƿ���ͨ
  }

  // ʱ�临�Ӷȣ� O(v)�����������ж���
  // ������Ч�ıߣ�Edgeʵ��
  *adjIterator(v) {
    let _flagV = this._graph[v]
    for(let i = 0, len = _flagV.length; i < len; ++i){
      if (_flagV[i]) {
        yield _flagV[i]
      }
    }
  }
}

// �ڽӱ�
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
  // Ϊ������ӱ�ʱ�临�Ӷȹ��ߣ��ڴ˲���������ƽ�б䣬������hasEdge�жϣ�
  // ͨ������ƽ�б߲����������б������ɺ�ͳһ����ƽ�б�
  addEdge(v, w, weight) {
    this._graph[v].push(new Edge(v, w, weight))

    // �����Ի���
    if (v !== w && !this._directed) {
      this._graph[w].push(new Edge(w, v, weight))
    }
    this._m += 1
  }
  // ʱ�临�Ӷ�O(n)
  hasEdge (v, w) {
    return !this._graph[v].every(e => {
      return e.other() !== v
    })
  }
  // ʱ�临�Ӷȣ�O(E)�������ýڵ����еı�
  // ����ĳ���ڵ�����б�
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