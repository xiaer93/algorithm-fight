// 使用链表实现队列，考虑使用双向链表
const { LinkedListQueue } = require('../list/list');

class ListQueue {
  constructor () {
    this._queue = new LinkedListQueue();
  }
  enqueue (value) {
    this._queue.addLast(value);
  }
  dequeue () {
    return this._queue.removeFirst();
  }
  getFront () {
    return this._queue.getFront();
  }
  getSize () {
    return this._queue.getSize();
  }
  isEmpty () {
    return this._queue.isEmpty();
  }
}

module.exports = {
  ListQueue
};
