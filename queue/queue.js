/**
 * Created by xiaer on 2018/10/16.
 */
// 线性数据结构
// 先进先出，FIFO

class Queue {
  constructor () {
    this._queue = [];
  }
  enqueue (value) {
    this._queue.push(value);
  }
  dequeue () {
    return this._queue.shift();
  }
  getFront () {
    return this._queue[0];
  }
  getSize () {
    return this._queue.length - 1;
  }
  isEmpty () {
    return this._queue.length === 0;
  }
}

// 循环队列降低了出队复杂度，传统队列出队会移动一次所有元素~~~
// 构建循环队列
class CircleQueue {
  // capacity为容量，必须可以为10个元素（tail+1 % c===front消耗了一个）
  constructor (capacity = 10) {
    this._queue = new Array(capacity + 1);
    // font === tail时数组为空，tail +  % c1 === front时数组满了
    this._front = 0;
    this._tail = 0;
    this._size = 0;
  }
  // 入队元素
  enqueue (value) {
    if ((this._tail + 1) % this._queue.length === this._front) {
      this._resize(this.getCapacity() * 2);
    }

    this._size += 1;
    this._queue[this._tail] = value;
    this._tail = (this._tail + 1) % this._queue.length;
  }
  // 出队元素
  dequeue () {
    if (this._front === this._tail) {
      throw new Error('队列不能为空！');
    }

    if (this._size === this.getCapacity() / 4 && this.getCapacity > 1) {
      this._resize(Math.floor(this.getCapacity / 2));
    }

    let _ret = this._queue[this._front];
    this._size -= 1;
    this._queue[this._front] = undefined;
    this._front = (this._front + 1) % this._queue.length;
    return _ret;
  }
  getFront () {
    return this._queue[this._front];
  }
  getCapacity () {
    return this._queue.length - 1;
  }
  getSize () {
    return this._size;
  }
  isEmpty () {
    return this._front === this._tail;
  }
  _resize (capacity) {
    let _tmpQueue = new Array(capacity + 1);
    for (let i = 0; i < this._size; ++i) {
      _tmpQueue[i] = this._queue[(this._front + i) % this._queue.length];
    }

    this._front = 0;
    this._tail = this._size;
    this._queue = _tmpQueue;
  }
}

module.exports = {
  Queue,
  CircleQueue
};
