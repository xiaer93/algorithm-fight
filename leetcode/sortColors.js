/**
 * Created by xiaer on 2018/9/25.
 */
let {swap} = require('../util/sortHelper')

// ��������ͳ��0��1��2�ĸ���
// ʱ�临�Ӷȣ�O(n)���ռ临�Ӷȣ�O(1)
function sortColor(array) {
  let count = [0,0,0]
  for(let i = 0,len = array.length; i < len; ++i) {
    count[array[i]] += 1
  }

  let index = 0
  for(let i = 0, len = count.length; i < len; ++i) {
    let iCount = count[i]
    for(let j = 0; j < iCount; ++j) {
      array[index++] = i
    }
  }
}

// 3·���������㷨��ֻ������һ�α���~~~
// ʱ�临�Ӷȣ�O(n)���ռ临�Ӷȣ�O(1)
function sortColor2(array) {
  // [0��zero]Ϊ0�� [zero + 1, two - 1]Ϊ1, [two, n-1]Ϊ2
  let zero = -1,
    two = array.length

  for (let i = 0; i < two; ) {
    // ѭ��������
    if (array[i] === 1) {
      i++
    } else if (array[i] === 2) {
      swap(array, --two, i)
    } else {
      swap(array, ++zero, i)
      i++
    }
  }
}

let ary = [1,2,0,1,2,0,0]
sortColor2(ary)
console.log(ary)