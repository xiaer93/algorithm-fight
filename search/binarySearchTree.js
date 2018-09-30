/**
 * Created by xiaer on 2018/9/29.
 */
// 二叉树能够高效解决一类问题，堆是满二叉树，二叉搜索树也是二叉树

// 查找问题是计算机中非常重要的基础问题
// 二分搜索树常用于  查找表的实现---字典数据结构，，，，将key作为搜索元素？
// 实现
// 普通数组： 查找元素O(n) 插入O(n) 删除O(n)
// 顺序数组：查找严肃logn  插入O(n) 删除O(n)
// 二分搜索树 logn logn logn。查找、删除、插入数据非常高效；可以方便回答数据的关系，如min/max/floor/ceil/rank/select

// 二叉树性质，1、每个节点大于左节点，小于右节点；2、每个节点都是二叉树
  // fixme: 如果等于节点呢？如何处理？=====>替换数据
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
  // 深度优先遍历
  // 前序遍历：先访问当前节点，再访问左右子树
  // 中序遍历：先访问左子树，再访问自身，最后访问右子树
  // 后序遍历：先递归访问左右子树，再访问自身
  preOrder () {
    this._preOrder(this._root)
  }
  inOrder () {
    this._inOrder(this._root)
  }
  postOrder () {
    this._postOrder(this._root)
  }

  // 层序遍历，广度优先概念
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
  // 前驱
  successor () {

  }
  // 后继
  predecessor() {

  }
  // floor
  // ceil
  // rank 58是排名第几的元素？在节点上新增（以当前节点为根的二叉树节点数量）
  // select 排名第十的元素是谁？

  size () {
    return this._count
  }
  isEmpty () {
    return this._count === 0
  }
  // todo:二叉搜索树自带递归性质，在插入删除等操作中药充分利用递归的特性~~~
  // fixme：私有方法有几种处理方式？？？
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
  // 释放某个节点及所有子节点
  _destroy (node) {
    if (node !== null) {
      this._destroy(node.left)
      this._destroy(node.right)
      this._count--
      node = null
    }
  }
  // 寻找最小节点
  _findMinNode(node) {
    while (node.left) {
      node = node.left
    }
    return node
  }
  // 删除最小值
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
  // 删除最大值
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
  // 删除以node为根的二叉树的节点key
  // 返回删除节点后新的二叉树的根
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

      // swap删除节点
      let _minNode = this._findMinNode(node.right)
      node.key = _minNode.key
      node.value = _minNode.value
      node.right = this._remove(node.right, _minNode.key)
      return node
    }
  }
}

// 非递归二叉搜索树实现
class BST2 {
  constructor () {

  }
}

// 支持重复元素的二分搜索树---新增count属性

// 二分搜索树的局限性，同样是数据，可以对应于不同的二叉搜索树，可能退化为链表
// 平衡二叉树：红黑树，avl树，2-tree，splay-tree,,treap
// trie

// 应用：：：统计某个单词在圣经全文中出现的次数！！！

// 树形问题，递归天然具有树形性质
// 如归并排序，快排，搜索问题：8皇后问题

module.exports = {
  BST
}