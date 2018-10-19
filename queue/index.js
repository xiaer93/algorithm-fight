var { Queue, CircleQueue } = require('./queue')

function testQueue (queueClass, count = 100000) {
  let _tmpQueue = new queueClass()

  let _startTime = +new Date()
  for (let i = 0; i < count; ++i) {
    _tmpQueue.enqueue(Math.floor(Math.random() * 100))
  }
  for (let j = 0; j < count; ++j) {
    _tmpQueue.dequeue()
  }
  let _endTime = +new Date()

  console.log(queueClass.name, _endTime - _startTime)
}

testQueue(Queue)
testQueue(CircleQueue)
