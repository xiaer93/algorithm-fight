/**
 * Created by xiaer on 2018/10/1.
 */
// ��һ�����ݣ���Ҫ֧������������1��union(p, q)��2��find��p��
// ������isConnected(p, q)

class QuickUnion{
  constructor(n) {
    // �����鹹��unionFind��idΪ�������š���ΪQuickFind
    this._count = n
    this._id = new Array(n).fill(0).map((t, i) => i)
  }
  find(p) {
    // ���ص�ǰ������id
    return this._id[p]
  }
  isConnected (p, q) {
    return this.find(p) === this.find(q)
  }
  // ����q��p
  // ʱ�临�Ӷȣ�O(n)
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

// ���鼯���õ�ʵ��˼·��ʱ�临�Ӷȷǳ���
// ÿ���ڵ�ָ�򸸽ڵ㣬���ڵ�ָ������
class UnionFind{
  constructor(n) {
    this._count = n
    this._parent = new Array(n).fill(0).map((t,i) => i)
  }
  // ���ص�ǰ������Ⱥ��id
  find (p) {
    // �����ǰ�ڵ㲻�Ǹ��ڵ㣬��ѭ���ҵ����ڵ�
    while (p !== this._parent[p]) {
      p = this._parent[p]
    }

    return p
  }
  isConnected (p, q) {
    return this.find(p) === this.find(q)
  }
  // ��ǰԪ�ظ��ڵ�ָ����ϲ�������ڵ�
  // ����������γɵ���Ϊ����1�����㼶����
  union (p, q) {
    let _pRoot = this.find(p)
    let _qRoot = this.find(q)

    if (_pRoot === _qRoot) {
      return
    }

    // ��p����ڵ��ָ��q��ĸ��ڵ㣬�ﵽ�ϲ�
    this._parent[_pRoot] = _qRoot
  }
}

// �����Ż��ϲ����̣�����ϲ�֮��ļ���������
// ��¼ÿ�����ϵĸ������������ٵļ����������ĺϲ�
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

// �����Ż��ϲ����̣�����ϲ�֮��ļ���������
// ��¼ÿ�����ϵĲ������㼶�ٵ���㼶��ĺϲ�
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

    // �������������Ϊ2�㣬�����ܿ��ܸ���
    // �������ڵݹ���Ҫ��ʱ��������������ܿ��ܸ���
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

// ·��ѹ������findʱ��ѹ��·������߲��ҵ�Ч��
class UnionFindBT3{
  constructor(n) {
    this._count = n
    this._parent = new Array(n).fill(0).map((t,i) => i)
    this._rank = new Array(n).fill(1)
  }
  find (p) {
    while (p !== this._parent[p]) {
      // ִ��·��ѹ��������㼶�����Ͳ㼶
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