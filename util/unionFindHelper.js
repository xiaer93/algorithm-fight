/**
 * Created by xiaer on 2018/10/1.
 */
function testUF1(UFClass, n) {
  let _uf = new UFClass(n)
  let _startTime = +new Date()

  for(let i = 0; i < n; ++i) {
    let _a = Math.floor(Math.random() * n)
    let _b = Math.floor(Math.random() * n)
    _uf.union(_a, _b)
  }

  for(let i = 0; i < n; ++i) {
    let _a = Math.floor(Math.random() * n)
    let _b = Math.floor(Math.random() * n)
    _uf.isConnected(_a, _b)
  }

  let _endTime = +new Date()

  console.log('UF1, ' , 2 * n + 'ops, ' , (_endTime - _startTime) + 'ms')
}

module.exports = {
  testUF1
}