/**
 * Created by xiaer on 2018/9/29.
 */
// �������ܹ���Ч���һ�����⣬������������������������Ҳ�Ƕ�����

// ���������Ǽ�����зǳ���Ҫ�Ļ�������
// ����������������  ���ұ��ʵ��---�ֵ����ݽṹ����������key��Ϊ����Ԫ�أ�
// ʵ��
// ��ͨ���飺 ����Ԫ��O(n) ����O(n) ɾ��O(n)
// ˳�����飺��������logn  ����O(n) ɾ��O(n)
// ���������� logn logn logn�����ҡ�ɾ�����������ݷǳ���Ч�����Է���ش����ݵĹ�ϵ����min/max/floor/ceil/rank/select

// ���������ʣ�1��ÿ���ڵ������ڵ㣬С���ҽڵ㣻2��ÿ���ڵ㶼�Ƕ�����
  // fixme: ������ڽڵ��أ���δ���=====>�滻����
class Node {
    constructor (key, value) {
      this.key = key
      this.value = value
      this.left = this.right = null
    }
}

class BST {
  constructor() {
    this._root = null
    this._count = 0
  }
  insert (key, value) {
    this._root = this._insert(this._root, key, value)
  }
  search (key) {
    return this._search(this._root, key)
  }
  contain (key) {
    return this._contain(this._root, key)
  }
  // ������ȱ���
  // ǰ��������ȷ��ʵ�ǰ�ڵ㣬�ٷ�����������
  // ����������ȷ������������ٷ�������������������
  // ����������ȵݹ���������������ٷ�������
  preOrder () {
    this._preOrder(this._root)
  }
  inOrder () {
    this._inOrder(this._root)
  }
  postOrder () {
    this._postOrder(this._root)
  }

  // ���������������ȸ���
  levelOrder () {
    if (this._root === null) {
      return
    }

    let _queue = []
    _queue.push(this._root)

    while (_queue.length !== 0) {
      let _node = _queue.shift()

      console.log(_node.value)
      _node.left && _queue.push(_node.left)
      _node.right && _queue.push(_node.right)
    }
  }

  remove (key) {
    this._remove(this._root, key)
  }
  removeMin () {
    if (this._root) {
      this._root = this._removeMin(this._root)
    }
  }
  removeMax () {
    if (this._root) {
      this._root = this._removeMax(this._root)
    }
  }
  // ǰ��
  successor () {

  }
  // ���
  predecessor() {

  }
  // floor
  // ceil
  // rank 58�������ڼ���Ԫ�أ��ڽڵ����������Ե�ǰ�ڵ�Ϊ���Ķ������ڵ�������
  // select ������ʮ��Ԫ����˭��

  size () {
    return this._count
  }
  isEmpty () {
    return this._count === 0
  }
  // todo:�����������Դ��ݹ����ʣ��ڲ���ɾ���Ȳ�����ҩ������õݹ������~~~
  // fixme��˽�з����м��ִ���ʽ������
  _insert(node, key, value) {
    if (node === null) {
      this._count++
      return new Node(key, value)
    }

    if (node.key === key) {
      node.value = value
    } else if (key < node.key) {
      node.left = this._insert(node.left, key, value)
    } else {
      node.right = this._insert(node.right, key, value)
    }

    return node
  }
  _search(node, key) {
    if (node === null) {
      return undefined
    }

    let _retValue
    if(node.key === key) {
      _retValue = node.value
    } else if(key < node.key) {
      _retValue = this._search(node.left, key)
    } else {
      _retValue = this._search(node.right, key)
    }

    return _retValue
  }
  _contain (node, key) {
    if (node === null) {
      return false
    }

    if(node.key === key) {
      return true
    } else if(key < node.key) {
      return this._contain(node.left, key)
    } else {
      return this._contain(node.right, key)
    }
  }
  _preOrder (node) {
    if (node !== null) {
      console.log(node.value)
      _preOrder(node.left)
      _preOrder(node.right)
    }
  }
  _inOrder (node) {
    if (node !== null) {
      _preOrder(node.left)
      console.log(node.value)
      _preOrder(node.right)
    }
  }
  _postOrder (node) {
    if (node !== null) {
      _preOrder(node.left)
      _preOrder(node.right)
      console.log(node.value)
    }
  }
  // �ͷ�ĳ���ڵ㼰�����ӽڵ�
  _destroy (node) {
    if (node !== null) {
      this._destroy(node.left)
      this._destroy(node.right)
      this._count--
      node = null
    }
  }
  // Ѱ����С�ڵ�
  _findMinNode(node) {
    while (node.left) {
      node = node.left
    }
    return node
  }
  // ɾ����Сֵ
  _removeMin (node) {
    if (node.left === null) {
      let _retNode = node.right
      this._destroy(node)
      this._count--

      return _retNode
    }
    node.left = this._removeMin(node.left)
    return node
  }
  // ɾ�����ֵ
  _removeMax (node) {
    if (node.right === null) {
      let _retNode = node.left
      this._destroy(node)
      this._count--

      return _retNode
    }
    node.right = this._removeMax(node.right)
    return node
  }
  // ɾ����nodeΪ���Ķ������Ľڵ�key
  // ����ɾ���ڵ���µĶ������ĸ�
  _remove(node, key) {
    if(node === null) {
      return null
    }
    if (key < node.key) {
      node.left = this._remove(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this._remove(node.right, key)
      return node
    } else {
      if (node.left === null && node.right === null) {
        node = null
        this._count --
        return node
      }
      if (node.left === null) {
        node = node.right
        this._count --
        return node
      }
      if (node.right === null) {
        node = node.left
        this._count --
        return node
      }

      // swapɾ���ڵ�
      let _minNode = this._findMinNode(node.right)
      node.key = _minNode.key
      node.value = _minNode.value
      node.right = this._remove(node.right, _minNode.key)
      return node
    }
  }
}

// �ǵݹ����������ʵ��
class BST2 {
  constructor () {

  }
}

// ֧���ظ�Ԫ�صĶ���������---����count����

// �����������ľ����ԣ�ͬ�������ݣ����Զ�Ӧ�ڲ�ͬ�Ķ����������������˻�Ϊ����
// ƽ����������������avl����2-tree��splay-tree,,treap
// trie

// Ӧ�ã�����ͳ��ĳ��������ʥ��ȫ���г��ֵĴ���������

// �������⣬�ݹ���Ȼ������������
// ��鲢���򣬿��ţ��������⣺8�ʺ�����

module.exports = {
  BST
}