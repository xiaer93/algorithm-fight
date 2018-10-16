/**
 * Created by xiaer on 2018/10/16.
 */
// 线性数据结构
// 先进先出，FIFO

class Queue{
  constructor(){
    this._queue = []
  }
  enqueue(value){
    this._queue.push(value)
  }
  dequeue(){
    return this._queue.shift()
  }
  getFront(){
    return this._queue[0]
  }
  getSize(){
    return this._queue.length - 1
  }
  isEmpty(){
    return this._queue.length === 0
  }
}