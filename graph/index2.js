/**
 * Created by xiaer on 2018/10/1.
 */
let {testGraph, ReadGraph} = require('../util/graphHelper')
let {SparseGraph, DenseGraph} = require('./weightGraph')

let g1 = new SparseGraph(8)
let tg1 = new ReadGraph(g1, '../graph/textG3.txt')

let g2 = new DenseGraph(8)
let tg2 = new ReadGraph(g2, '../graph/textG3.txt')

setTimeout(function () {
  g1.show()
  g2.show()


}, 100)