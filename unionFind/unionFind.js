/**
 * Created by xiaer on 2018/10/1.
 */
// 对一组数据，主要支持两个动作：1、union(p, q)；2、find（p）
// 衍生：isConnected(p, q)

class QuickUnion{
  constructor(n) {
    // 以数组构造unionFind，id为关联代号。成为QuickFind
    this._count = n
    this._id = new Array(n).fill(0).map((t, i) => i)
  }
  find(p) {
    // 返回当前索引的id
    return this._id[p]
  }
  isConnected (p, q) {
    return this.find(p) === this.find(q)
  }
  // 关联q和p
  // 时间复杂度：O(n)
  union(p, q) {
    let _pId = this.find(p)
    let _qId = this.find(q)

    if (_pId === _qId) {
      return
    }

    this._id.forEach((t, i) => {
      if (t === _pId) {
        this._id[i] = _qId
      }
    })
  }
}

// 并查集更好的实现思路，时间复杂度非常好
// 每个节点指向父节点，根节点指向自身
class UnionFind{
  constructor(n) {
    this._count = n
    this._parent = new Array(n).fill(0).map((t,i) => i)
  }
  // 返回当前索引的群组id
  find (p) {
    // 如果当前节点不是根节点，则循环找到根节点
    while (p !== this._parent[p]) {
      p = this._parent[p]
    }

    return p
  }
  isConnected (p, q) {
    return this.find(p) === this.find(q)
  }
  // 当前元素根节点指向待合并对象根节点
  // 最差的情况，形成的树为仅仅1条，层级过高
  union (p, q) {
    let _pRoot = this.find(p)
    let _qRoot = this.find(q)

    if (_pRoot === _qRoot) {
      return
    }

    // 将p组根节点的指向q组的根节点，达到合并
    this._parent[_pRoot] = _qRoot
  }
}

// 继续优化合并过程，避免合并之后的集合树过高
// 记录每个集合的个数，个数较少的集合向个数多的合并
class UnionFindBT{
  constructor(n) {
    this._count = n
    this._parent = new Array(n).fill(0).map((t,i) => i)
    this._rank = new Array(n).fill(1)
  }
  find (p) {
    while (p !== this._parent[p]) {
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
      this._rank[_qRoot] += this._rank[_pRoot]
    } else {
      this._parent[_qRoot] = _pRoot
      this._rank[_pRoot] += this._rank[_qRoot]
    }


  }
}

// 继续优化合并过程，避免合并之后的集合树过高
// 记录每个集合的层数，层级少的向层级多的合并
class UnionFindBT2{
  constructor(n) {
    this._count = n
    this._parent = new Array(n).fill(0).map((t,i) => i)
    this._rank = new Array(n).fill(1)
  }
  find (p) {
    // while (p !== this._parent[p]) {
    //   p = this._parent[p]
    // }
    // return p

    // 如果将所有树将为2层，则性能可能更好
    // 但是由于递归需要耗时，所以上面的性能可能更好
    if (p !== this._parent[p]){
      this._parent[p] = this.find(this._parent[p])
    }
    return this._parent[p]

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

// 路径压缩，在find时，压缩路径，提高查找的效率
class UnionFindBT3{
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
  QuickUnion,
  UnionFind,
  UnionFindBT,
  UnionFindBT2,
  UnionFindBT3
}