/**
 * Created by xiaer on 2018/9/30.
 */
const fs = require('fs')
let {BST} = require('./binarySearchTree')

fs.readFile('./bible.txt', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    // data为数据流
    let text = data.toString()

    // 统计单词数量
    let bst = new BST()
    // 文本分词
    let start = 0,
      length = 0

    while (start < text.length) {
      // 获取单词
      while (start + length < text.length && isAbc(text[start + length])) {
        length++
      }
      let _word = text.substr(start, length).toLowerCase()
      let _count = bst.search(_word) || 0
      bst.insert(_word, ++_count)

      // 跳过非字母，并初始化变量
      while (start + length < text.length && !isAbc(text[start + length])) {
        length++
      }

      start += length
      length = 0
    }

    // 输出
    console.log(bst.search('of'))
  }
})

function isAbc (chr) {
  let _code = chr.charCodeAt(0)
  return (65 <= _code && 90 >= _code) || (97 <= _code && 122 >= _code)
}