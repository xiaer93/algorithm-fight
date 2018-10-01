/**
 * Created by xiaer on 2018/10/1.
 */
let {testUF1} = require('../util/unionFindHelper')
let {QuickUnion, UnionFind, UnionFindBT, UnionFindBT2, UnionFindBT3} = require('./unionFind')

// testUF1(QuickUnion, 30000)
// testUF1(UnionFind, 100000)
testUF1(UnionFindBT, 1000000)
testUF1(UnionFindBT2, 1000000)
testUF1(UnionFindBT3, 1000000)