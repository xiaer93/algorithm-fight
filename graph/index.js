/**
 * Created by xiaer on 2018/10/1.
 */
let {testGraph, ReadGraph} = require('../util/graphHelper')
let {SparseGraph, DenseGraph} = require('./graph')

// testGraph(DenseGraph)
// testGraph(SparseGraph)

let g1 = new SparseGraph(7)
let tg1 = new ReadGraph(g1, '../graph/textG2.txt')

let g2 = new DenseGraph(13)
let tg2 = new ReadGraph(g2, '../graph/textG1.txt')

setTimeout(function () {
  // g1.show()
  // g2.show()
  g1.init()
  g2.init()
  console.log(g1.count())
  console.log(g2.isConnected(0, 7), g2._id)


}, 100)