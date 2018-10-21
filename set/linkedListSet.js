// 高层数据结构，集合和映射。
const { BST } = require('../search/binarySearchTree');
const { LinkedList } = require('../list/list');

// 集合：集合中的元素只能只有一次，去重
// 二分搜索树是很好的实现集合的基础数据结构
// 二分搜索树默认为不支持重复元素，但是可以自己定义包含重复元素。

// 应用：客户统计，文本词汇量统计

// js不能重载比较运算符，那么对于数据结构中的比较如何处理，预定义compare方法？
class Set {
  constructor () {
    this._set = new BST();
  }
  add () {
    //
  }
  remove (value) {
    return this._set.remove(value);
  }
  contains () {

  }
  getSize () {
    return this._set.getSize();
  }
  isEmpty () {
    return this._set.isEmpty();
  }
}

// 使用链表实现集合
class LinkedListSet {
  constructor () {
    this._set = new LinkedList();
  }
  add (value) {
    if (!this.contains(value)) {
      this._set.addFirst(value);
    }
  }
  remove (value) {
    this._set.remove(value);
  }
  contains (value) {
    return this._set.contains(value);
  }
  getSize () {

  }
  isEmpty () {
    return this._set.isEmpty();
  }
}

// 二分搜索树的速度高于链表实现

// 集合的时间复杂度: 链表   二分搜索树(h为高度)
// 2^h + 1 = n 满二叉树，h = log2(n+1)=O(logn)
// 增add  O(n)  O(h)
// 查contains O(n)  O(h)
// 删remove O(n)  O(h)

// leetcode-804集合问题

