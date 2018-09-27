/**
 * Created by xiaer on 2018/9/27.
 */
// �����ݽṹ�������ȶ��е�Ӧ��
// ��̬cpu��������n��Ԫ����ѡ��m��Ԫ�أ����ȶ���ʱ�临�Ӷ�nlogm��

// ���ȶ���ʵ�ַ�ʽ��
// ��ͨ���飺���O(1)������O(n);
// ˳�����飺���O(n)������O(1);
// �ѣ� ���O(lgn)������O(lgn)

// ����ѣ�1��ÿ���ڵ����2���ڵ㣻2����ȫ��������3���ӽڵ㲻���ڸ��ڵ㣨���ѣ�
// ʹ������洢����ѣ����ղ����������ң���ڵ㣺���ڵ���� * 2���ҽڵ㣺���ڵ���� * 2 + 1��
let  {swap} = require('../util/sortHelper')

class MaxHeap {
  constructor() {
    this._data = []
    this._count = 0
  }
  insert (value) {
    this._data[++this._count] = value

    // shiftUp
    this._shiftUp(this._count)
  }
  print () {
    // �Ե����Ϲ�����ӡ�б�~~~
    // n�����ڵ����� 2^n - 1
    let _depth = Math.floor(Math.log2(this._count)) + 1
    let _padLeft = [0, 20 * (_depth - 1)]
  }
  size () {
    return this._count
  }
  isEmpty () {
    return this._count === 0
  }
  _shiftUp (k) {
    // �¼���Ԫ���븸Ԫ�ؽ��бȽϣ��ݹ���н���
    let tmpK = Math.floor(k / 2)
    while ( k > 1 && this._data[tmpK] < this._data[k]) {
      swap(this._data, tmpK, k)
      k = tmpK
      tmpK = Math.floor(k / 2)
    }
  }
}

let a = new MaxHeap()
for(let i = 0; i < 20; i++) {
  a.insert(Math.floor(Math.random() * 100))
}
a.print()