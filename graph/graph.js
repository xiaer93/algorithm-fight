/**
 * Created by xiaer on 2018/10/1.
 */

// �ڽӾ�����ڽӱ�
// �ڽӱ��ʺ�ϡ��ͼ���ڽӾ����ʺϳ���ͼ
// �ߵ�����ԶԶ���ڵ�Ӧ���еı�����������ȫͼ��ÿ����֮�䶼���ڱߣ�

class Graph {
  constructor () {
    this._visited = null
    // ��ͨ����
    this._cCount = 0
    // �ڵ�������
    this._id = null
  }
  // ������ͨ����
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
    throw new Error('���뱻������д')
  }
  e () {
    throw new Error('���뱻������д')
  }
  *adjIterator() {
    throw new Error('���뱻������д')
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

// �ڽӾ���---����ͼ
class DenseGraph extends Graph{
  // nΪ�������� directedΪ����ͼ��־λ
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
  // ������ȱ���������Ӧ�ã���ͨ��������


  // ������ȱ���
  // ��vw��һ����
  addEdge(v, w) {
    if (this.hasEdge(v, w)) {
      return
    }

    this._graph[v][w] = true
    if (!this._directed) {
      this._graph[w][v] = true
    }

    // ����ͼ����ͼ���߲������֣�
    this._m += 1
  }
  hasEdge (v, w) {
    return this._graph[v][w]
  }
  // ʱ�临�Ӷȣ� O(v)�����������ж���
  *adjIterator(v) {
    let _flagV = this._graph[v]
    for(let i = 0, len = _flagV.length; i < len; ++i){
      if (_flagV[i]) {
        yield i
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
    // �ڽӱ����Խ���������ʾ����ɾ���ڵ�ͱ���Ч�ʸ���
    // fill������飬�����ָ����ͬ
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
  // Ϊ������ӱ�ʱ�临�Ӷȹ��ߣ��ڴ˲���������ƽ�б䣬������hasEdge�жϣ�
  // ͨ������ƽ�б߲����������б������ɺ�ͳһ����ƽ�б�
  addEdge(v, w) {
    this._graph[v].push(w)

    // �����Ի���
    if (v !== w && !this._directed) {
      this._graph[w].push(v)
    }
    this._m += 1
  }
  // ʱ�临�Ӷ�O(n)
  hasEdge (v, w) {
    return this._graph[v].indexOf(w) !== 0
  }
  // ɾ��ƽ�б�
  removeEdg() {
    this._graph = this._graph.map(t => {
      return [...new Set(t)]
    })
  }
  // ʱ�临�Ӷȣ�O(E)�������ýڵ����еı�
  // ����ĳ���ڵ�������ڽӽڵ�
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