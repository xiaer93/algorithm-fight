/**
 * Created by xiaer on 2018/9/25.
 */
let {swap} = require('../util/sortHelper')

// ��insertSort�����������������ĸ߼��㷨~~~ ���Ӷȣ�����n ^ 2/3

function shellSort (array) {
  // �����ȶ���� h = 3*h + 1
  let len = array.length
  let hList = [1]
  let tmpH = 1
  while (tmpH < len) {
    tmpH = 3 * tmpH + 1
    hList.push(tmpH)
  }

  // ���ڲ�������ĸ߼������㷨
  while (hList.length !== 0) {
    tmpH = hList.pop()
    // ����С�ķ�������
    for(let k = 0; k < tmpH; ++k) {
      // ���û��������㷨��������������~~~
      for(let i = 0; i < len; i = i + tmpH) {
        let tmpNumber = array[i]
        let j = i
        for(; j > 0 && array[j - tmpH] > tmpNumber; j = j - tmpH) {
          array[j] = array[j - tmpH]
        }
        array[j] = tmpNumber
      }
    }
  }
}

module.exports = {
  shellSort
}