/**
 * Created by xiaer on 2018/9/25.
 */
let {swap} = require('../util/sortHelper')
// �������򣨵�ǰԪ����ǰ������Ԫ�����αȽϣ�
function insertSort(array) {
  for(let i = 1, len = array.length; i < len; ++i) {
    for (let j = i; j > 0 && array[j - 1] > array[j]; --j) {
      // ��Ԫ�ط��뵽����λ�ã�����ֱ��break����break�Ͳ���break�����ܲ��ܴ�
      // �������������ǰ��ֹ����ѡ���������ܺ�һ���~~~
      swap(array, j, j - 1)
    }
  }
  return array
}
// ���������Ż�������swap������
// insert�����ڽ�����������飬���ܷǳ��ã������ȸ߼������㷨���ܸ���~~~
function insertSort2(array) {
  for(let i = 1, len = array.length; i < len; ++i) {
    let tmpNumber = array[i]
    let j = i
    for(; j > 0 && array[j - 1] > tmpNumber; --j) {
      array[j] = array[j-1]
    }
    array[j] = tmpNumber
  }
  return array
}

module.exports = {
  insertSort,
  insertSort2
}