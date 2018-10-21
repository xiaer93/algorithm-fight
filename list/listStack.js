// 链表在首节点增删操作，时间复杂度为O(1)，因此非常适合栈数据结构
// arrayStack，linkedListStack，没有复杂度上的差异。
const { DummyLinkedList } = require('./list');

class ListStack {
  constructor () {
    this._stack = new DummyLinkedList();
  }
  push (value) {
    this._stack.addFirst(value);
  }
  pop () {
    return this._stack.removeFirst();
  }
  peek () {
    return this._stack.getFirst();
  }
  getSize () {
    return this._stack.getSize();
  }
  isEmpty () {
    return this._stack.isEmpty();
  }
}

module.exports = {
  ListStack
};
