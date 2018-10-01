/**
 * Created by xiaer on 2018/10/1.
 */
const fs = require('fs')
const readline = require('readline')

function testGraph(graphClass) {
  let n = 20
  let m = 100

  let _g = new graphClass(n, false)
  for(let i = 0; i < m; ++i) {
    let _a = Math.floor(Math.random() * n)
    let _b = Math.floor(Math.random() * n)
    _g.addEdge(_a, _b)
  }
  // _g.removeEdg()

  for(let v = 0; v < n; ++v) {
    let _printStr = ''
    let _adj = _g.adjIterator(v)
    for(let w of _adj) {
      _printStr += ' ' + w
    }
    console.log(v + ': ', _printStr)
  }
}

class ReadGraph {
  constructor(graph, filename) {
    // 点和边的数量
    let _v, _e
    let _fileStream = this._readFile(filename, (index, text) => {
      let _text = text.split(' ').map(t => parseFloat(t))

      if (index === 0) {
        _v = _text[0]
        _e = _text[1]
      } else {
        graph.addEdge(_text[0], _text[1], _text[2])
      }
    })
  }
  _readFile(filename, callback) {
    let _r = readline.createInterface({
      input: fs.createReadStream(filename)
    })

    let _index = 0
    _r.on('line', (line) => {
      callback && callback(_index++, line)
    })
  }
}

class MinHeap {
  constructor() {

  }
}

module.exports = {
  testGraph,
  ReadGraph
}