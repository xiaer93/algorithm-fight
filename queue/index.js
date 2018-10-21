const { Queue, CircleQueue } = require('./queue');
const { ListQueue } = require('./listQueue');

function testQueue (QueueClass, count = 100000) {
  let _tmpQueue = new QueueClass();

  let _startTime = +new Date();
  for (let i = 0; i < count; ++i) {
    _tmpQueue.enqueue(Math.floor(Math.random() * 100));
  }
  for (let j = 0; j < count; ++j) {
    _tmpQueue.dequeue();
  }
  let _endTime = +new Date();

  console.log(QueueClass.name, _endTime - _startTime);
}

function testOrigin (count = 100000) {
  let _tmpQueue = [];
  let _startTime = +new Date();

  for (let i = 0; i < count; ++i) {
    _tmpQueue.push(Math.floor(Math.random() * 100));
  }
  for (let j = 0; j < count; ++j) {
    _tmpQueue.shift();
  }
  let _endTime = +new Date();

  console.log('originArray', _endTime - _startTime);
}

// 循环队列降低了出队复杂度，提高了性能。
testQueue(Queue);
testQueue(CircleQueue);
testQueue(ListQueue);
testOrigin();
