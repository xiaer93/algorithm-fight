// 链表是真正的动态数据结构，最贱的数据结构
// 实现链表需要深入理解引用和递归等知识
// 辅助图的邻接顶点法实现。
// 链表丧失了随机访问能力（借助索引快速访问），但是动态结构，不需要处理固定容量的问题
// 链表的增删改查时间复杂度都是： O(n)
// 但是如果只对链表头进行操作，则其时间复杂度为O(1)
// 更多链表的话题：链表所有的操作都可以通过递归实现

class Node {
  constructor (value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor () {
    this._head = null;
    this._size = 0;
  }
  // 返回链表中元素个数
  getSize () {
    return this._size;
  }
  isEmpty () {
    return this._size === 0;
  }
  addFirst (value) {
    this._head = new Node(value, this._head);
    this._size++;
  }
  // 在链表index位置添加新元素，0-size
  // 但是链表中不是一个常用操作，联系用：)
  add (index, value) {
    if (index < 0 || index >= this._size) {
      throw new Error('添加失败，索引无效');
    }
    if (index === 0) {
      this.addFirst(value);
    } else {
      let _prev = this._head;
      for (let i = 0; i < index - 1; i++) {
        _prev = _prev.next;
      }
      _prev.next = new Node(value, _prev.next);
      this._size++;
    }
  }
  addLast (value) {
    this.add(this._size, value);
  }
  // 联系用，在链表中不常用
  get (index) {
    if (index < 0 || index >= this._size) {
      throw new Error('添加失败，索引无效');
    }
    // 当前节点_cur
    let _cur = this._head;
    for (let i = 0; i < index; ++i) {
      _cur = _cur.next;
    }
    return _cur;
  }
  getFist () {
    return this.get(0);
  }
  getLast () {
    return this.get(this._size - 1);
  }
  set (index, value) {
    if (index < 0 || index >= this._size) {
      throw new Error('添加失败，索引无效');
    }
    // 当前节点_cur
    let _cur = this._head;
    for (let i = 0; i < index; ++i) {
      _cur = _cur.next;
    }
    _cur.value = value;
  }
  contains (value) {
    // 当前节点_cur
    let _cur = this._head;
    while (_cur) {
      if (_cur.value === value) {
        return true;
      }
      _cur = _cur.next;
    }
    return false;
  }
  toString () {
    console.log('toString');
  }
}

// 为链表设立虚拟头结点，避免添加节点分类讨论
class DummyLinkedList {
  constructor () {
    // 虚拟头结点，方便添加节点的操作
    this._dummyHead = new Node(null);
    this._size = 0;
  }
  // 时间复杂度： O(n/2)=O(n)
  add (index, value) {
    if (index < 0 || index >= this._size) {
      throw new Error('添加失败，索引无效');
    }
    let _prev = this._dummyHead;
    for (let i = 0; i < index; ++i) {
      _prev = _prev.next;
    }
    _prev.next = new Node(value, _prev.next);
    this._size++;
  }
  addFirst (value) {
    this.add(0, value);
  }
  addLast (value) {
    this.add(this._size, value);
  }
  remove (index) {
    // cur = cur.next并不能删除变量，~~~~cur为变量，指向某个地址。
    if (index < 0 || index >= this._size) {
      throw new Error('添加失败，索引无效');
    }
    let _prev = this._dummyHead;
    for (let i = 0; i < index; ++i) {
      _prev = _prev.next;
    }
    let _retNode = _prev.next;
    _prev.next = _retNode.next;
    // 删除引用，方便回收变量
    _retNode.next = null;
    this._size--;
    return _retNode;
  }
  removeFirst () {
    this.remove(0);
  }
  removeLast () {
    this.remove(this._size - 1);
  }
  getFist () {
    if (!this.isEmpty()) {
      return this._dummyHead.next.value;
    }
  }
  getSize () {
    return this._size;
  }
  isEmpty () {
    return this._size === 0;
  }
}

// 双指针链表，专门服务于队列。只对链表头尾进行插入删除操作
// 没有dummyHead虚拟节点，因为不涉及中间节点操作
class LinkedListQueue {
  constructor () {
    this._head = null;
    this._tail = null;
    this._size = null;
  }
  addLast (value) {
    if (this._tail === null) {
      this._tail = new Node(value);
      this._head = this._tail;
    } else {
      this._tail.next = new Node(value);
      this._tail = this._tail.next;
    }
    this._size++;
  }
  removeFirst () {
    if (this.isEmpty()) {
      throw new Error('队列为空！');
    }
    let _retNode = this._head;
    this._head = this._head.next;
    // 删除引用。
    _retNode.next = null;

    if (this._head === null) {
      this._tail = null;
    }

    this._size--;

    return _retNode.value;
  }
  getFront () {
    if (this.isEmpty()) {
      throw new Error('队列为空！');
    }
    return this._head.value;
  }
  getSize () {
    return this._size;
  }
  isEmpty () {
    return this._size === 0;
  }
}

function solution (head, value) {

}

module.exports = {
  LinkedList,
  DummyLinkedList,
  LinkedListQueue
};
