/**
 * Created by xiaer on 2018/10/1.
 */
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
  // ��С��������v-1�����������ж��㣬����Ȩֵ��С.[����ڴ�Ȩ������ͼ�������ͨͼ]
  // Ĭ������ͼ������ͨͼ
  // �зֶ���cut Property���ڸ��������з��У����б���Ȩֵ��С�ı߱�Ȼ������С��������������ͼ�еĽڵ��Ϊ2�����֣������з֡�
  lazyPrim () {

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