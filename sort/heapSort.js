/**
 * Created by xiaer on 2018/9/27.
 */
// �����ݽṹ�ʺ�ά����̬���ݣ�����ֱ����������
// �����ݽṹ�������ȶ��е�Ӧ��
// ��̬cpu��������n��Ԫ����ѡ��m��Ԫ�أ����ȶ���ʱ�临�Ӷ�nlogm��

// ���ȶ���ʵ�ַ�ʽ��
// ��ͨ���飺���O(1)������O(n);
// ˳�����飺���O(n)������O(1);
// �ѣ� ���O(lgn)������O(lgn)

// ����ѣ�1��ÿ���ڵ����2���ڵ㣻2����ȫ��������3���ӽڵ㲻���ڸ��ڵ㣨���ѣ�
// ʹ������洢����ѣ����ղ����������ң���ڵ㣺���ڵ���� * 2���ҽڵ㣺���ڵ���� * 2 + 1��
let  {swap} = require('../util/sortHelper')

// ����һ�����ѽṹ
class MaxHeap {
  constructor() {
    this._data = []
    this._count = 0
  }
  createHeap (array) {
    this._data = [, ...array]
    this._count = array.length

    // �����һ����Ϊ�ӽڵ�Ľڵ����~~~�������ݹ�ڵ㣬����shiftDown����������
    for(let i = Math.floor(this._count / 2); i >= 1; i--) {
      this._shiftDown(i)
    }
  }
  insert (value) {
    this._data[++this._count] = value

    // shiftUp
    this._shiftUp(this._count)
  }
  extractMax () {
    let _ret = this._data[1]

    swap(this._data, 1, this._count--)
    this._shiftDown(1)

    return _ret
  }
  print () {
    // �Ե����Ϲ�����ӡ�б�~~~
    // n�����ڵ����� 2^n - 1
    let _depth = Math.floor(Math.log2(this._count)) + 1
    let _padLeft = []

    let _outStr = []

    // ������ײ��ӡ����
    let _start = Math.pow(2, _depth - 1)
    let _end = Math.pow(2, _depth) - 1
    let _gap = 0
    let _str = ''
    for(let j = _start; j <= _end; ++j) {
      _padLeft[j] = _gap
      _gap += 2

      _str = _insert(_str, _padLeft[j], this._data[j])
    }
    _outStr.push(_str)

    // �Ե����Ϲ������еĴ�ӡ����~
    for(let i = _depth - 1; i > 0; --i) {
      _str = ''
      let _start = Math.pow(2, i - 1)
      let _end = Math.pow(2, i) - 1
      for(let j = _start; j <= _end; ++j) {
        _padLeft[j] = Math.floor((_padLeft[j * 2] + _padLeft[j * 2 + 1]) / 2)
        _str = _insert(_str, _padLeft[j], this._data[j])
      }
      _outStr.push(_str)
    }

    // ��ӡ����
    for(let i = _outStr.length - 1; i>= 0; --i) {
      console.log(_outStr[i])
    }

    // ����ÿһ�е��ַ���
    function _insert(str, gap, number = 0) {
      let _len = str.length
      if (_len < gap * 3 + 2) {
        str = str.padEnd(gap * 3, ' ')
        str += number.toString().padStart(2, '0')
      } else {
        str = str.substring(0, gap * 3) + number.toString().padStart(2, '0') + str.substring(gap * 3 + 2)
      }

      return str
    }
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
  _shiftDown (k) {
    // �����ƶ�Ԫ�أ��ݹ�ֱ�������������
    // todo�����Գ���ͨ�����������Ż��������
    while (2 * k <= this._count) {
      let j = 2 * k
      if ( j + 1 <= this._count && this._data[j + 1] > this._data[j]) {
        j += 1
      }

      if (this._data[k] >= this._data[j]){
        break
      }
      swap(this._data, k, j)
      k = j
    }
  }
}

// ����һ����С�ѽṹ
class MinHeap {
  constructor () {
    // ��[1,��ʼ�洢����
    this._data =[]
    this._count = 0
  }
  insert(value) {
    this._count += 1
    this._data[this._count] = value
    this._shiftUp(this._count)
  }
  extractMin() {
    let retValue = this._data[1]
    swap(this._data, 1, this._count--)
    this._shiftDown(1)
    debugger
    return retValue
  }
  size() {
    return this._count
  }
  isEmpty() {
    return this._count ===0
  }
  _shiftUp(k) {
    let tmpK = Math.floor(k / 2)
    while (tmpK > 0 && this._data[tmpK] > this._data[k]) {
      swap(this._data, tmpK, k)
      k = tmpK
      tmpK = Math.floor(k / 2)
    }
  }
  _shiftDown(k) {
    // �������ӽڵ�ʱ���ż�������
    while ( 2 * k <= this._count) {
      let  j = 2 * k

      if(j + 1 <= this._count && this._data[j+1] < this._data[j]) {
        j = j + 1
      }
      if (this._data[k] <= this._data[j]){
        break
      }
      swap(this._data, k, j)
      k = j
    }
  }
}

// fixme: index��reverse�����������㷨���Ӷ�~~~index�����˽�����reverse�������޸�~~~
class IndexMaxHeap {
  constructor () {
    // data�������ݣ�index����������countΪ����
    this._data = []
    this._index = []
    this._count = 0
    this._reverse = []
  }
  insert (value) {
    this._data[++this._count] = value
    this._index[this._count] = this._count
    this._reverse[this._count] = this._count
    this._shiftUp(this._count)
  }
  extractMax () {
    let _ret = this._data[this._index[1]]
    swap(this._index, 1, this._count--)
    this._reverse[this._index[1]] = 1
    this._reverse[this._index[this._count--]] = 0
    this._shiftDown(1)

    return _ret
  }
  extractMaxIndex () {
    let _ret = this._index[1]
    return _ret
  }
  getItem (index) {
    return this._data[index]
  }
  // n + lgn.����ʱ�临�Ӷȣ� O(n)
  change (index, value) {
    this._data[index] = value

    // �ҵ� _index[k] === index
    let _k = this._index.findIndex(t => t === index)
    this._shiftUp(_k)
    this._shiftDown(_k)
  }
  changeReverse (index, value) {
    this._data[index] = value

    // ʹ��reverse�����¼����Ӷȣ�����ΪO(1)
    let _k = this._reverse[index]
    this._shiftUp(_k)
    this._shiftDown(_k)
  }
  isEmpty () {
    return this._count === 0
  }
  // shiftUp��shiftDown������index���н�������������ֱ�Ӵ���
  _shiftUp (k) {
    let _tmpK = Math.floor( k / 2)
    while (k > 1 && this._data[this._index[k]] > this._data[this._index[_tmpK]]) {
      // ��������
      swap(this._index, k, _tmpK)
      this._reverse[this._index[k]] = k
      this._reverse[this._index[_tmpK]] = _tmpK
      k = _tmpK
      _tmpK = Math.floor( k / 2)
    }
  }
  _shiftDown (k) {
    while (2 * k <= this._count) {
      let j = 2 * k
      if ( j + 1 <= this._count && this._data[this._index[j + 1]] > this._data[this._index[j]]) {
        j += 1
      }

      if (this._data[this._index[k]] >= this._data[this._index[j]]){
        break
      }
      swap(this._index, k, j)
      this._reverse[this._index[k]] = k
      this._reverse[this._index[j]] = j
      k = j
    }
  }
}

// �㷨���Ӷȣ�nlogn
function heapSort1(array) {
  let _heap = new MaxHeap()
  for(let i = 0, len = array.length; i < len; ++ i) {
    _heap.insert(array[i])
  }

  for(let i = array.length - 1; i >= 0; i --) {
    array[i] = _heap.extractMax()
  }
}

// �㷨���Ӷ�: O(n)
function heapSort2(array) {
  let _heap = new MaxHeap()
  // ֱ�Ӵ������ݣ�����ShiftDown����������
  _heap.createHeap(array)

  for(let i = array.length - 1; i >= 0; --i) {
    array[i] = _heap.extractMax()
  }
}

// ����2�������򣬿ռ临�Ӷ�ΪO(n)��������ԭ�ض����򣬽������򣬿ռ临�ӶȽ�ΪO(1)
// parent(i) = (i-1)/2  leftChild(i) = 2*i + 1, rightChild = 2*i + 2
function heapSort3(array) {
  for(let i = Math.floor((array.length - 1) / 2); i >= 0; i--) {
    _shiftDown(array, array.length-1, i)
  }
  for(let i = array.length - 1; i > 0; i--) {
    swap(array, 0, i)
    _shiftDown(array, i - 1, 0)
  }


  function _shiftDown (array, count, k) {
    // �����ƶ�Ԫ�أ��ݹ�ֱ�������������
    // todo�����Գ���ͨ�����������Ż��������
    while (2 * k + 1 <= count) {
      let j = 2 * k + 1
      if ( j + 1 <= count && array[j + 1] > array[j]) {
        j += 1
      }

      if (array[k] >= array[j]){
        break
      }
      swap(array, k, j)
      k = j
    }
  }
}

let a = new MinHeap()
for(let i = 0; i < 20; i++) {
  a.insert(Math.floor(Math.random() * 100))
}
// console.log(a.extractMaxIndex(), a.getItem(a.extractMaxIndex()))

while (!a.isEmpty()) {
  console.log(a.extractMin())
}


module.exports = {
  heapSort1,
  heapSort2,
  heapSort3
}
